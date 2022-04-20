import { useRouter } from "next/router";
import { useAuth } from "../src/components/common/auth/context/AuthContext";
import Login from "../src/pages/login";
import { act, fireEvent, render } from "../src/utility/test-utils";

jest.mock("next/router");
jest.mock("../src/components/common/auth/context/AuthContext");
jest.mock("next-auth/client");

describe("Log In", () => {
  let expectedSignIn, expectedEmail, expectedPassword, expectedRouterPush;
  beforeEach(() => {
    expectedRouterPush = jest.fn();
    expectedSignIn = jest.fn();
    expectedSignIn.mockResolvedValue("");
    expectedEmail = "superghadmin@guardantdemo.com";
    expectedPassword = "Guardant@2021";

    useRouter.mockReturnValue({ push: expectedRouterPush });
    useAuth.mockReturnValue({
      user: 123,
      logIn: expectedSignIn,
    });
  });

  test("should redirect on sign in", async () => {
    const { getByTestId, getByText } = render(<Login />);
    const email = getByTestId("username"); // can use screen.getByTestId also
    const password = getByTestId("password");
    const signInButton = getByText("Sign Inn");

    await act(async () => {
      fireEvent.change(email.querySelector("#username"), {
        target: { value: expectedEmail },
      });
      fireEvent.change(password.querySelector("#password"), {
        target: { value: expectedPassword },
      });
      fireEvent.click(signInButton);
    });

    expect(email.querySelector("#username").value).toBe(
      "superghadmin@guardantdemo.com"
    );
    expect(password.querySelector("#password").value).toBe("Guardant@2021");
    expect(expectedSignIn).toHaveBeenCalledTimes(1);
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
