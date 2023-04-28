import {
  Link as ChakraLink,
  type ThemingProps,
  type LinkProps,
} from "@chakra-ui/react";
import NextLink from "next/link";

type Props = LinkProps &
  ThemingProps & {
    href: string;
    children: React.ReactNode | string;
  };

export default function Link({ href, ...props }: Props) {
  return (
    <ChakraLink
      _hover={{ textDecoration: "none" }}
      as={NextLink}
      href={href ?? ""}
      {...props}
    />
  );
}
