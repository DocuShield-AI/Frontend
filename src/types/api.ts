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

export type ContractStatus =
  | "queued"
  | "extracting"
  | "embedding"
  | "classifying"
  | "ready"
  | "failed";

export type RiskLevel = "low" | "medium" | "high";

export type Contract = {
  id: string;
  name: string;
  status: ContractStatus;
  uploadedAt: string;
  uploadedBy?: string;
  size?: number;
  riskCount?: number;
};

export type ClauseRisk = {
  id: string;
  title: string;
  excerpt: string;
  level: RiskLevel;
  confidence?: number;
  needsHumanReview?: boolean;
};

export type ContractDetail = Contract & {
  clauses?: ClauseRisk[];
};

export type WorkspaceStats = {
  contractsThisMonth: number;
  collaborators: number;
  completedReviews: number;
  reviewActivity: number;
  readyRate: number;
  processedClauses: number;
  riskCoverage: number;
};

export type WorkspaceMember = {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  joinedAt?: string;
};

export type BillingInfo = {
  plan: string;
  status: string;
  price?: string;
  renewalDate?: string;
};
