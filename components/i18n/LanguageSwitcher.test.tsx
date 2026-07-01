import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

const refresh = vi.fn();
const setLocaleAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("@/app/actions/locale", () => ({
  setLocale: (...args: unknown[]) => setLocaleAction(...args),
}));

afterEach(() => {
  cleanup();
  refresh.mockClear();
  setLocaleAction.mockClear();
});

describe("LanguageSwitcher", () => {
  it("affiche les boutons FR et EN", () => {
    render(<LanguageSwitcher initialLocale="fr" />);
    expect(screen.getByTestId("locale-fr")).toBeInTheDocument();
    expect(screen.getByTestId("locale-en")).toBeInTheDocument();
  });

  it("appelle l'action serveur au clic sur EN", async () => {
    setLocaleAction.mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<LanguageSwitcher initialLocale="fr" />);
    const switcher = screen.getByTestId("language-switcher");
    await user.click(switcher.querySelector('[data-testid="locale-en"]')!);
    await waitFor(() => {
      expect(setLocaleAction).toHaveBeenCalledWith("en");
      expect(refresh).toHaveBeenCalled();
    });
  });
});
