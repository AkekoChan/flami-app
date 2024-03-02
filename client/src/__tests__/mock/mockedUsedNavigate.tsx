import { vi } from "vitest";

const mockedUsedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

export default mockedUsedNavigate;
