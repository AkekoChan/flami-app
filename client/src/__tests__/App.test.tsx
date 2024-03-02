// Imports
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
// To Test
import { BrowserRouter } from "react-router-dom";
import SignupForm from "../components/auth/signup/SignupForm";
import mockedUsedNavigate from "./mock/mockedUsedNavigate";

// Tests
describe("Rend le formulaire d'inscription correctement", async () => {
  it("Le formulaire devrait s'afficher correctement", async () => {
    // Setup
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );
    const h1 = screen.queryByText("Quel est ton sport préféré ?");

    // Expectations
    expect(h1).not.toBeNull();
  });

  it("Les boutons fonctionnent correctement", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );
    const nextButtons = await screen.findAllByText("Continuer");
    const prevButtons = await screen.findAllByLabelText("Retour");

    expect(nextButtons).not.toBeNull();
    expect(prevButtons).not.toBeNull();

    nextButtons.forEach((button) => {
      user.click(button);
    });

    prevButtons.forEach((button) => {
      user.click(button);
    });
  });

  it("Les champs du formulaire de la étape fonctionnent correctement", async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    const nextButtons = await screen.findAllByText("Continuer");
    nextButtons.slice(0, -1).forEach((button) => {
      userEvent.click(button);

      waitFor(() => {
        const nameInput = screen.getByLabelText("name");
        const emailInput = screen.getByLabelText("email");
        const ageInput = screen.getByLabelText("age");
        const passwordInput = screen.getByLabelText("password");
        const confirmPasswordInput = screen.getByLabelText("confirmPassword");

        userEvent.clear(nameInput);
        userEvent.type(nameInput, "John");

        userEvent.clear(emailInput);
        userEvent.type(emailInput, "yfDz6@example.com");

        userEvent.clear(ageInput);
        userEvent.type(ageInput, "20");

        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, "password");

        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, "password");

        expect(nameInput).toBe("John");
        expect(emailInput).toBe("yfDz6@example.com");
        expect(ageInput).toBe("20");
        expect(passwordInput).toBe("password");
        expect(confirmPasswordInput).toBe("password");
      });
    });
  });

  it("Le formulaire fonctionne correctement", async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );
    const nextButtons = await screen.findAllByText("Continuer");

    nextButtons.forEach((button) => {
      userEvent.click(button);

      waitFor(() => {
        const endButton = screen.getByText("Terminer l'inscription");
        const nameInput = screen.getByLabelText("name");
        const emailInput = screen.getByLabelText("email");
        const ageInput = screen.getByLabelText("age");
        const passwordInput = screen.getByLabelText("password");
        const confirmPasswordInput = screen.getByLabelText("confirmPassword");

        userEvent.clear(nameInput);
        userEvent.type(nameInput, "John");

        userEvent.clear(emailInput);
        userEvent.type(emailInput, "yfDz6@example.com");

        userEvent.clear(ageInput);
        userEvent.type(ageInput, "20");

        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, "passwordM6*");

        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, "passwordM6*");

        userEvent.click(endButton);

        expect(mockedUsedNavigate).toBeCalled();
      });
    });
  });

  it("La persistance du formulaire fonctionne correctement", async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    const nextButtons = screen.getAllByText("Continuer");

    userEvent.click(nextButtons[0]);

    waitFor(() => {
      const choice = screen.getByText("Sport de combat");
      const returnButton = screen.getByLabelText("Retour");

      userEvent.click(choice);
      userEvent.click(returnButton);

      expect(screen.getByLabelText("true")).not.toBeNull();
    });
  });
});
