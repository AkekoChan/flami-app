import Phaser from "phaser";
import { EventBus } from "../EventBus";

export class Runner extends Phaser.Scene {
  private character!: Phaser.GameObjects.Sprite;
  private startTrack!: Phaser.GameObjects.Image;
  private flagNormal!: Phaser.GameObjects.Image;
  private flagScratched!: Phaser.GameObjects.Sprite;
  private normalTracks: Phaser.GameObjects.Image[] = [];
  private tapImages: Phaser.GameObjects.Image[] = [];
  private timerText!: Phaser.GameObjects.Text;
  public elapsedTime: number = 0;
  private timerInterval!: number;
  private isRunning: boolean = false;
  private scrollSpeed: number = 0;
  private trackCount: number = 19;

  constructor() {
    super("Runner");
  }

  preload() {
    this.load.spritesheet(
      "prepare",
      "/assets/game/runner/prerun-anim-sprite.png",
      {
        frameWidth: 512,
        frameHeight: 512,
      }
    );
    this.load.spritesheet("run", "/assets/game/runner/run-anim-sprite.png", {
      frameWidth: 565,
      frameHeight: 623,
    });

    this.load.image("start-track", "/assets/game/runner/bg-start-track.png");
    this.load.image("track", "/assets/game/runner/bg-track.png");
    this.load.image("background", "/assets/game/runner/hidden-runner.png");
    this.load.image("flag", "/assets/game/runner/flag.png");

    this.load.spritesheet(
      "scratched-flag",
      "/assets/game/runner/flag-scratched-sprite.png",
      {
        frameWidth: 512,
        frameHeight: 512,
      }
    );

    this.load.image("tap", "/assets/game/runner/tap.png");
    this.load.audio("tap-audio", "/assets/game/runner/audio/tap.mp3");
  }

  create() {
    this.startTrack = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 1.6,
      "start-track"
    );
    this.startTrack.displayWidth = 320;
    this.startTrack.displayHeight = 200;

    for (let i = 0; i < this.trackCount; i++) {
      const track = this.add.image(
        this.startTrack.x + this.startTrack.displayWidth * (i + 1),
        this.cameras.main.height / 1.6,
        "track"
      );
      track.displayWidth = 320;
      track.displayHeight = 200;

      this.normalTracks.push(track);
    }

    this.anims.create({
      key: "scratched",
      frames: this.anims.generateFrameNumbers("scratched-flag", {
        start: 0,
        end: 23,
      }),
      frameRate: 20,
      repeat: -1,
    });

    const lastTrack = this.normalTracks[16];
    this.flagNormal = this.add.sprite(
      lastTrack.x + lastTrack.displayWidth / 2 - 150,
      lastTrack.y - 35,
      "flag"
    );
    this.flagNormal.scale = 0.15;

    this.flagNormal.visible = true;

    this.flagScratched = this.add
      .sprite(
        lastTrack.x + lastTrack.displayWidth / 2 - 150,
        lastTrack.y - 35,
        "scratched-flag"
      )
      .play("scratched");
    this.flagScratched.displayHeight = 300;
    this.flagScratched.displayWidth = 350;

    this.flagScratched.visible = false;

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const circleRadius = 160;

    const bg = this.add.image(centerX, centerY, "background");
    bg.displayHeight = this.cameras.main.height;
    bg.displayWidth = this.cameras.main.width;

    const maskCircle = this.make.graphics();
    maskCircle.fillCircle(centerX, centerY, circleRadius);

    const mask = maskCircle.createGeometryMask();

    mask.invertAlpha = true;

    bg.setMask(mask);

    this.anims.create({
      key: "staying",
      frames: this.anims.generateFrameNumbers("prepare", {
        start: 0,
        end: 39,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("run", {
        start: 0,
        end: 16,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.character = this.add
      .sprite(
        this.cameras.main.width * 0.3,
        this.cameras.main.height * 0.56,
        "prepare"
      )
      .play("staying")
      .setScale(0.4);

    const tapSound = this.sound.add("tap-audio");

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const tapImage = this.add.image(pointer.x, pointer.y, "tap");
      tapImage.displayHeight = 64;
      tapImage.displayWidth = 64;
      this.tapImages.push(tapImage);

      tapSound.play();

      if (this.tapImages.length > 4) {
        const removedTapImage = this.tapImages.shift();
        removedTapImage?.destroy();
      }

      if (!this.isRunning) {
        this.startRace();
      } else {
        this.increaseSpeed();
      }
    });

    setInterval(() => {
      if (this.tapImages.length > 0) {
        const removedTapImage = this.tapImages.shift();
        removedTapImage?.destroy();
      }
    }, 500);

    this.timerText = this.add.text(20, 20, "Temps: 00:00", {
      fontSize: "24px",
      fontFamily: "Arial",
      color: "#000",
    });
  }

  update() {
    this.startTrack.x -= this.scrollSpeed;
    for (const track of this.normalTracks) {
      track.x -= this.scrollSpeed;
    }

    const lastTrack = this.normalTracks[16];
    this.flagNormal.x = lastTrack.x + lastTrack.displayWidth / 2 - 150;
    this.flagNormal.y = lastTrack.y - 35;
    this.flagScratched.x = lastTrack.x + lastTrack.displayWidth / 2 - 150;
    this.flagScratched.y = lastTrack.y - 35;

    if (this.character.x >= this.flagNormal.x && this.isRunning) {
      this.flagNormal.visible = false;
      this.flagScratched.visible = true;
      this.finishRace();
    }

    if (!this.isRunning) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.elapsedTime += 1;
      const minutes = Math.floor(this.elapsedTime / 60);
      const seconds = this.elapsedTime % 60;
      const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      this.timerText.setText(`Temps: ${formattedTime}`);

      EventBus.emit("timer", this.elapsedTime);
    }, 1000);
  }

  startRace() {
    if (!this.isRunning) {
      if (this.character.alpha === 0) {
        return;
      }

      this.startTimer();
      this.isRunning = true;
      this.scrollSpeed = 2;

      this.character.visible = false;

      if (this.isRunning) {
        this.character = this.add
          .sprite(
            this.cameras.main.width * 0.4,
            this.cameras.main.height * 0.56,
            "run"
          )
          .play("running")
          .setScale(0.4);
      }
    }
  }

  increaseSpeed() {
    const maxSpeed = 16;

    if (this.scrollSpeed < maxSpeed) {
      this.scrollSpeed += 0.2;

      if (this.scrollSpeed > maxSpeed) {
        this.scrollSpeed = maxSpeed;
      }
    }
  }

  finishRace() {
    this.tweens.add({
      targets: this.character,
      alpha: 0,
      duration: 50,
      onComplete: () => {
        this.isRunning = false;
        this.scrollSpeed = 0;
      },
    });
  }
}
