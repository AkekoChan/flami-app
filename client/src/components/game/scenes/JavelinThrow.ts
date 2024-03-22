export class JavelinThrow extends Phaser.Scene {
  private gauge!: Phaser.GameObjects.Image;
  private maskGraphics!: Phaser.GameObjects.Graphics;
  private maskWidth: number = -250;
  private chargeSpeed: number = 2;
  private startingGame: boolean = false;
  private power: number = 0;

  constructor() {
    super("JavelinThrow");
  }

  preload() {
    this.load.image("gauge", "assets/javelin/gauge.png");
  }

  create() {
    this.gauge = this.add.image(this.cameras.main.width / 2, 100, "gauge");
    this.gauge.displayWidth = 300;
    this.gauge.displayHeight = 150;

    this.maskGraphics = this.add.graphics();
    this.maskGraphics.fillStyle(0x00000);
    this.maskGraphics.fillRect(
      this.cameras.main.width / 2 + 125,
      0,
      this.maskWidth,
      this.gauge.displayHeight
    );

    this.input.on("pointerdown", () => {
      this.startingGame = true;
    });

    this.input.on("pointerup", () => {
      this.launchJavelin();
      this.startingGame = false;
    });
  }

  update() {
    if (this.startingGame) {
      this.maskWidth += this.chargeSpeed;

      if (this.maskWidth > 0) {
        return;
      }

      this.maskGraphics.clear();
      this.maskGraphics.fillRect(
        this.cameras.main.width / 2 + 125,
        0,
        this.maskWidth,
        this.gauge.displayHeight
      );

      this.getPosition(this.maskWidth);
    }
  }

  getPosition(position: number) {
    switch (true) {
      case position >= -250 && position < -192:
        this.power = 0;
        break;
      case position >= -192 && position < -143:
        this.power = 25;
        break;
      case position >= -143 && position < -118:
        this.power = 50;
        break;
      case position >= -118 && position < -92:
        this.power = 75;
        break;
      case position >= -92 && position < -62:
        this.power = 99;
        break;
      case position >= -62 && position < -48:
        this.power = 75;
        break;
      case position >= -48 && position < -34:
        this.power = 50;
        break;
      case position >= -34 && position < -18:
        this.power = 25;
        break;
      case position >= -18 && position <= 0:
        this.power = 0;
        break;
      default:
        break;
    }
  }

  launchJavelin() {
    console.log("Javelin launched with power:", this.power);
  }
}
