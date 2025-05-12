export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + Tailwind CSS",
  description:
    "A simple and elegant starter template for Next.js with Tailwind CSS.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "",
    twitter: "",
    docs: "",
    discord: "",
  },
};
