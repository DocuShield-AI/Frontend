export type UserRole = "admin" | "legal" | "viewer";

export type ApiUser = {
  userId: string;
  email: string;
  role: UserRole;
  workspaceId: string;
};

export type AuthUserResponse = {
  user: ApiUser;
};

export type SignupInitResponse = {
  message: string;
  email: string;
  requiresVerification: true;
};

export type MessageResponse = {
  message: string;
};

export type VerifyResetCodeResponse = {
  valid: true;
};

export type SignupBody =
  | {
      type: "create";
      email: string;
      password: string;
      workspaceName: string;
    }
  | {
      type: "join";
      email: string;
      password: string;
      inviteCode: string;
    };

export type LoginBody = {
  email: string;
  password: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type VerifyResetCodeBody = {
  email: string;
  code: string;
};

export type ResetPasswordBody = {
  email: string;
  code: string;
  password: string;
};

export type VerifySignupBody = {
  email: string;
  code: string;
};

export type ResendSignupCodeBody = {
  email: string;
};
