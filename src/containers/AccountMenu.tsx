import { useCallback, useMemo } from "react";
import { signOut } from "next-auth/react";
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";

import { type NextAuthSessionUser } from "@/types";
import { COLOR_VARIANT } from "@/utils";

type Props = {
  user: NextAuthSessionUser;
};

export default function AccountMenu({ user }: Props) {
  const toast = useToast();

  const onSignout = useCallback(async () => {
    try {
      await signOut({ callbackUrl: "/", redirect: false });
    } catch (err) {
      console.log(err);
      toast({
        title: "Cannot sign out.",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [toast]);

  const contextMenu = useMemo(
    () => [
      {
        key: "PROFILE",
        label: "Profile",
        icon: <UserIcon className="h-5 w-5" />,
      },
      {
        key: "SETTINGS",
        label: "Settings",
        icon: <WrenchScrewdriverIcon className="mr-1 h-4 w-4" />,
      },
      { key: "DIVIDER-01" },
      {
        key: "SIGNOUT",
        label: "Sign out",
        icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
        variant: COLOR_VARIANT.DANGER,
        onClick: onSignout,
      },
    ],
    [onSignout]
  );

  return (
    <Menu>
      <MenuButton px={4} py={2}>
        <HStack spacing={1}>
          <Avatar size="sm" src={user.image ?? ""} />
          <ChevronDownIcon className="h-6 w-6" />
        </HStack>
      </MenuButton>

      <MenuList>
        {contextMenu.map(({ key, label, variant, icon: Icon, onClick }) =>
          key.includes("DIVIDER") ? (
            <MenuDivider key={key} />
          ) : (
            <MenuItem key={key} textAlign="right" onClick={onClick}>
              <HStack spacing={4} color={variant ?? ""}>
                {Icon}
                <span>{label}</span>
              </HStack>
            </MenuItem>
          )
        )}
      </MenuList>
    </Menu>
  );
}
