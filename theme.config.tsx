import Image from "next/image";
import { ThemeSwitch } from "nextra-theme-docs";

export default {
  logo: "Logo",
  project: {
    link: "https://github.com/thisisamr/blog",
  },
  chat: {
    link: "https://discord.com/channels/1208165119255773214/1208165119255773216",
  },
  navbar: {
    extraContent: <ThemeSwitch lite className="[&_span]:hidden" />,
  },
  // ... other theme options
};
