
import { ThemeSwitch } from "nextra-theme-docs";
import Logo from "./components/Logo";
export default {
  logo: <Logo/>,
  project: {
    link: "https://github.com/thisisamr/blog",
  },
  chat: {
    link: "https://discord.com/channels/1208165119255773214/1208165119255773216",
  },
  navbar: {
    extraContent: <ThemeSwitch lite className="[&_span]:hidden" />,
  }, docsRepositoryBase:"https://github.com/thisisamr/blog/tree/main"
  // ... other theme options
};
