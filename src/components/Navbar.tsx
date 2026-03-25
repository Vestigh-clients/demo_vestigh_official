import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { LayoutDashboard, Menu, Search, ShoppingBag, X } from "lucide-react";
import SignOutConfirmModal from "@/components/auth/SignOutConfirmModal";
import StoreLogo from "@/components/StoreLogo";
import { contentConfig } from "@/config/content.config";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useSignOutWithCartWarning } from "@/hooks/useSignOutWithCartWarning";

interface ProfileMenuProps {
  isOpen: boolean;
  userInitial: string;
  userName: string;
  userEmail: string;
  menuId: string;
  containerRef: RefObject<HTMLDivElement>;
  onToggle: () => void;
  onClose: () => void;
  onSignOut: () => void;
}

const accountMenuLinks = [
  { to: "/account", label: "Overview" },
  { to: "/account/orders", label: "My Orders" },
  { to: "/account/addresses", label: "Addresses" },
  { to: "/account/profile", label: "Personal Details" },
  { to: "/account/password", label: "Change Password" },
];

const isHashLink = (href: string) => href.includes("#");

const ProfileMenu = ({
  isOpen,
  userInitial,
  userName,
  userEmail,
  menuId,
  containerRef,
  onToggle,
  onClose,
  onSignOut,
}: ProfileMenuProps) => {
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-label="Open account menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 font-body text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/20"
      >
        {userInitial}
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-[95] mt-3 min-w-[260px] rounded-[var(--theme-radius-lg)] bg-[var(--theme-surface)] p-2 shadow-[var(--theme-shadow-soft)]"
        >
          <div className="rounded-[calc(var(--theme-radius-lg)-2px)] bg-[var(--theme-surface-alt)] px-4 py-3">
            <p className="font-display text-[22px] font-bold tracking-tight text-[var(--theme-primary)]">{userName}</p>
            <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--theme-text-muted)]">{userEmail}</p>
          </div>

          <div className="py-2">
            {accountMenuLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                role="menuitem"
                className="block rounded-[var(--theme-radius-md)] px-3 py-2.5 font-body text-[11px] uppercase tracking-[0.14em] text-[var(--theme-text-muted)] transition-colors hover:bg-[var(--theme-surface-alt)] hover:text-[var(--theme-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSignOut();
            }}
            role="menuitem"
            className="w-full rounded-[var(--theme-radius-md)] px-3 py-2.5 text-left font-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted-soft)] transition-colors hover:bg-[var(--theme-surface-alt)] hover:text-[var(--theme-danger)]"
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [badgeScaleClass, setBadgeScaleClass] = useState("scale-100");
  const [isDesktopUserMenuOpen, setIsDesktopUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);

  const location = useLocation();
  const desktopUserMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement | null>(null);
  const previousTotalItemsRef = useRef(0);
  const badgeResetTimeoutRef = useRef<number | null>(null);

  const { totalItems, openCart } = useCart();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { isConfirmOpen, isSubmitting, requestSignOut, confirmSignOut, cancelSignOut } = useSignOutWithCartWarning();

  useEffect(() => {
    previousTotalItemsRef.current = totalItems;
  }, []);

  useEffect(() => {
    if (totalItems > previousTotalItemsRef.current) {
      setBadgeScaleClass("scale-[1.24]");

      if (badgeResetTimeoutRef.current) {
        window.clearTimeout(badgeResetTimeoutRef.current);
      }

      badgeResetTimeoutRef.current = window.setTimeout(() => {
        setBadgeScaleClass("scale-100");
      }, 180);
    }

    previousTotalItemsRef.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    return () => {
      if (badgeResetTimeoutRef.current) {
        window.clearTimeout(badgeResetTimeoutRef.current);
      }
    };
  }, []);

  const closeUserMenus = useCallback(() => {
    setIsDesktopUserMenuOpen(false);
    setIsMobileUserMenuOpen(false);
  }, []);

  useEffect(() => {
    setOpen(false);
    closeUserMenus();
  }, [closeUserMenus, location.pathname]);

  useEffect(() => {
    if (!isDesktopUserMenuOpen && !isMobileUserMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      const clickedDesktopMenu = desktopUserMenuRef.current?.contains(targetNode) ?? false;
      const clickedMobileMenu = mobileUserMenuRef.current?.contains(targetNode) ?? false;

      if (clickedDesktopMenu || clickedMobileMenu) {
        return;
      }

      closeUserMenus();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeUserMenus();
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeUserMenus, isDesktopUserMenuOpen, isMobileUserMenuOpen]);

  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const metadataFirstName = typeof metadata.first_name === "string" ? metadata.first_name.trim() : "";
  const metadataLastName = typeof metadata.last_name === "string" ? metadata.last_name.trim() : "";
  const fallbackName = (user?.email ?? "").split("@")[0];
  const userName = [metadataFirstName, metadataLastName].filter(Boolean).join(" ") || fallbackName || "My Account";
  const userEmail = user?.email ?? "";
  const userInitial = (metadataFirstName || userEmail || "U").slice(0, 1).toUpperCase();

  const isLinkActive = useCallback(
    (href: string) => {
      if (href === "/shop") {
        return location.pathname.startsWith("/shop") || location.pathname.startsWith("/category/");
      }

      if (isHashLink(href)) {
        return location.pathname === "/";
      }

      return location.pathname === href;
    },
    [location.pathname],
  );

  const navLinks = useMemo(() => contentConfig.navigation.primaryLinks, []);

  const renderNavLink = (link: (typeof navLinks)[number], mobile = false) => {
    const baseClass = mobile
      ? "block rounded-[var(--theme-radius-md)] px-4 py-3 font-display text-[1.05rem] font-bold tracking-tight transition-colors"
      : "font-display text-[1.02rem] font-bold tracking-tight transition-colors";
    const stateClass = isLinkActive(link.href) ? "text-white" : "text-[rgba(207,226,249,0.78)] hover:text-white";

    if (isHashLink(link.href)) {
      return (
        <a
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={`${baseClass} ${stateClass}`}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.href}
        to={link.href}
        onClick={() => setOpen(false)}
        className={`${baseClass} ${stateClass}`}
      >
        {link.label}
      </Link>
    );
  };

  const adminAction = isAuthenticated && isAdmin ? (
    <Link
      to="/admin"
      aria-label="Open admin panel"
      title="Admin Panel"
      className="text-white/70 transition-colors hover:text-white"
    >
      <LayoutDashboard size={19} strokeWidth={1.5} />
    </Link>
  ) : null;

  const cartAction = (
    <button
      type="button"
      aria-label="Open cart"
      onClick={() => {
        setOpen(false);
        openCart();
      }}
      className="relative text-white transition-colors hover:text-white/80"
    >
      <ShoppingBag size={20} strokeWidth={1.55} />
      {totalItems > 0 ? (
        <span
          className={`absolute -right-[10px] -top-[8px] inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--theme-nav-solid-interactive)] px-[4px] font-body text-[9px] font-semibold leading-none text-[var(--theme-primary)] transition-transform duration-200 ${badgeScaleClass}`}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      ) : null}
    </button>
  );

  const searchAction = (
    <Link to="/shop" aria-label="Browse shop" className="text-white transition-colors hover:text-white/80">
      <Search size={20} strokeWidth={1.55} />
    </Link>
  );

  const authActionDesktop = isAuthenticated ? (
    <ProfileMenu
      isOpen={isDesktopUserMenuOpen}
      userInitial={userInitial}
      userName={userName}
      userEmail={userEmail}
      menuId="desktop-account-menu"
      containerRef={desktopUserMenuRef}
      onToggle={() => {
        setIsMobileUserMenuOpen(false);
        setIsDesktopUserMenuOpen((previous) => !previous);
      }}
      onClose={closeUserMenus}
      onSignOut={requestSignOut}
    />
  ) : (
    <Link to="/auth/login" className="font-body text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white">
      Sign In
    </Link>
  );

  const authActionMobile = isAuthenticated ? (
    <ProfileMenu
      isOpen={isMobileUserMenuOpen}
      userInitial={userInitial}
      userName={userName}
      userEmail={userEmail}
      menuId="mobile-account-menu"
      containerRef={mobileUserMenuRef}
      onToggle={() => {
        setIsDesktopUserMenuOpen(false);
        setIsMobileUserMenuOpen((previous) => !previous);
      }}
      onClose={closeUserMenus}
      onSignOut={requestSignOut}
    />
  ) : (
    <Link to="/auth/login" className="font-body text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white">
      Sign In
    </Link>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--theme-nav-solid-bg)] shadow-[0_20px_44px_rgba(5,16,29,0.2)]">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" aria-label="Store home" className="inline-flex items-center">
            <StoreLogo className="h-10 w-auto md:h-12" textClassName="text-[1.65rem] font-bold tracking-[-0.04em] text-white" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => renderNavLink(link))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            {searchAction}
            {cartAction}
            {adminAction}
            {authActionDesktop}
          </div>

          <div className="flex items-center gap-4 md:hidden">
            {searchAction}
            {cartAction}
            {adminAction}
            {authActionMobile}
            <button
              type="button"
              onClick={() => setOpen((previous) => !previous)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="text-white"
            >
              {open ? <X size={24} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-white/10 bg-[rgba(26,37,51,0.98)] px-6 pb-5 pt-4 md:hidden">
            <div className="flex flex-col gap-1">{navLinks.map((link) => renderNavLink(link, true))}</div>

            {!isAuthenticated ? (
              <Link
                to="/auth/login"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-[var(--theme-radius-md)] px-4 py-3 font-body text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white"
              >
                Sign In
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  closeUserMenus();
                  requestSignOut();
                }}
                className="mt-3 block w-full rounded-[var(--theme-radius-md)] px-4 py-3 text-left font-body text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white"
              >
                Sign Out
              </button>
            )}
          </div>
        ) : null}
      </nav>

      <SignOutConfirmModal
        isOpen={isConfirmOpen}
        isSubmitting={isSubmitting}
        onConfirm={confirmSignOut}
        onCancel={cancelSignOut}
      />
    </>
  );
};

export default Navbar;
