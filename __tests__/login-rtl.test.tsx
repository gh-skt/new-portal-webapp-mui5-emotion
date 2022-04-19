import React from "react";
import { useRouter } from "next/router";
import Login from "../src/pages/login";
import { render } from "../src/utility/test-utils";
import { act, fireEvent } from "@testing-library/react";
import { signIn } from "next-auth/client";
import {
  useAuth,
  useProvideAuth,
} from "../src/components/common/auth/context/AuthContext";

jest.mock("next/router");
jest.mock("../../src/components/common/auth/context/AuthContext");
jest.mock("next-auth/client");

xdescribe("Log In", () => {
  let expectedSignIn,
    expectedSignOut,
    expectedEmail,
    expectedPassword,
    expectedRouterPush;
  beforeEach(() => {
    window.fetch = jest.fn();
    expectedRouterPush = jest.fn();
    expectedSignIn = jest.fn();
    expectedSignOut = jest.fn();
    expectedSignIn.mockResolvedValue("");
    expectedEmail = "superghadmin@guardantdemo.com";
    expectedPassword = "Guardant@2021";

    useRouter.mockReturnValue({ push: expectedRouterPush });
    useProvideAuth.mockReturnValue({
      user: 123,
      LogOut: expectedSignOut,
      logIn: expectedSignIn,
    });
  });

  it("should redirect on sign in", async () => {
    const { getByTestId } = render(<Login />);
    const email = getByTestId("username"); // can use screen.getByTestId also
    const password = getByTestId("password");
    const signInButton = getByTestId("signIn");

    await act(async () => {
      fireEvent.change(email.querySelector("#username"), {
        target: { value: expectedEmail },
      });

      expect(email.querySelector("#username").value).toBe(
        "superghadmin@guardantdemo.com"
      );

      fireEvent.change(password.querySelector("#password"), {
        target: { value: expectedPassword },
      });
      expect(password.querySelector("#password").value).toBe("Guardant@2021");
      fireEvent.click(signInButton);
      expect(expectedSignIn).toHaveBeenCalledTimes(1);
    });
  });

  // expect(expectedSignIn).toHaveBeenCalledTimes(1);
  // expect(expectedSignIn).toHaveBeenCalledWith(
  //   expectedEmail,
  //   expectedPassword
  // );

  // expect(expectedRouterPush).toHaveBeenCalledTimes(1);
  //expect(expectedRouterPush).toHaveBeenCalledWith("/dashboard");

  // test('should show error', async () => {
  //     expectedSignIn.mockRejectedValue({
  //         message: 'Invalid username.'
  //     });

  //     const {getByText, getByLabelText} = render(<Login />);
  //     const email = getByLabelText('Email Address');
  //     const password = getByLabelText('Password');
  //     const signInButton = getByText('Sign In');

  //     await act(async () => {
  //         fireEvent.change(email, {target: {value: 'foo'}});
  //         fireEvent.change(password, {target: {value: expectedPassword}});
  //         fireEvent.click(signInButton);
  //     });

  //     expect(expectedSignIn).toHaveBeenCalledTimes(1);
  //     expect(expectedSignIn).toHaveBeenCalledWith('foo', expectedPassword);

  //     const errorMessage = getByText('Unable to sign in');
  //     expect(errorMessage).toBeVisible();
  // });

  // test('should show error for required fields', async () => {
  //     const {getByText} = render(<Login />);
  //     const signInButton = getByText('Sign In');

  //     await act(async () => {
  //         fireEvent.click(signInButton);
  //     });

  //     const emailError = getByText('Please enter valid username');

  //     expect(emailError).toBeVisible();

  //     expect(expectedSignIn).not.toHaveBeenCalled();
  //     expect(expectedRouterPush).not.toHaveBeenCalled();
  // });
});
