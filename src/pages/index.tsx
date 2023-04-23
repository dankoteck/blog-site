import { useRef } from "react";

import { signInWithPopup } from "@/utils";
import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";

import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import NextLink from "next/link";
import {
  FaDiscord,
  FaFacebookSquare,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { type AvailableAuthProviders } from "@/types";

const btnGroup = [
  {
    id: 1,
    icon: <FcGoogle className="h-6 w-6" />,
    text: "Sign in with Google",
    provider: "google",
  },
  {
    id: 2,
    icon: <FaFacebookSquare className="h-6 w-6 text-facebook-icon" />,
    text: "Sign in with Facebook",
    provider: "facebook",
  },
  {
    id: 3,
    icon: <FaGithub className="h-6 w-6" />,
    text: "Sign in with Github",
    provider: "github",
  },
  {
    id: 4,
    icon: <FaDiscord className="h-6 w-6 text-discord-icon" />,
    text: "Sign in with Discord",
    provider: "discord",
  },
  {
    id: 5,
    icon: <FaTwitter className="h-6 w-6 text-twitter-icon" />,
    // text: "Sign in with Twitter (Forbidden)",
    text: "(Not available)",
    provider: "twitter",
    disabled: true,
  },
];

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { data: session } = useSession();
  const user = session?.user;

  const onLogin = (provider: AvailableAuthProviders) => {
    try {
      const url = `/auth/${provider}`;
      signInWithPopup(url, "Signin");
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: "Cannot create an account.",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const onSignout = async () => {
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
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="description"
          content="Lekhoa Blog site generated by t3.app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <header>
          <nav className="">
            <Flex
              p={4}
              borderBottom="1px"
              borderColor="gray.200"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link _hover={{ textDecoration: "none" }} href="/" as={NextLink}>
                <Text fontSize="3xl">BLOG SITE</Text>
              </Link>
              <InputGroup width="fit-content">
                <InputLeftElement pointerEvents="none">
                  <MagnifyingGlassIcon width={20} />
                </InputLeftElement>
                <Input width="96" placeholder="Search anything..." />
              </InputGroup>
              {user ? (
                <Menu>
                  <MenuButton px={4} py={2}>
                    <HStack spacing={1}>
                      <Avatar size="sm" src={user.image ?? ""} />
                      <ChevronDownIcon className="h-6 w-6" />
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem width="full" textAlign="right">
                      <HStack spacing={4} justifyContent="start">
                        <UserIcon className="h-5 w-5" />
                        <span>Profile</span>
                      </HStack>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem textAlign="right">
                      <HStack spacing={4}>
                        <WrenchScrewdriverIcon className="mr-1 h-4 w-4" />
                        <span>Settings</span>
                      </HStack>
                    </MenuItem>
                    <MenuItem
                      textAlign="right"
                      onClick={() => void onSignout()}
                    >
                      <HStack color="red.500" spacing={4}>
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        <span>Sign out</span>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Stack direction="row" alignItems="center">
                  <Button
                    onClick={onOpen}
                    size={"sm"}
                    leftIcon={<UserIcon className="h-6 w-6" />}
                    colorScheme="purple"
                    variant="solid"
                  >
                    Login
                  </Button>
                </Stack>
              )}
            </Flex>

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
              size="2xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Sign in to your account
                  <Heading size="sm" fontWeight="normal">
                    Not a member?{" "}
                    <Button
                      variant="link"
                      color="blue.500"
                      fontWeight="normal"
                      // onClick={toggleForm}
                    >
                      Create an account for free.
                    </Button>
                  </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody p={6} height="fit-content">
                  <Center>
                    <VStack spacing={4}>
                      {btnGroup.map(
                        ({ id, icon: Icon, text, provider, disabled }) => (
                          <Button
                            borderRadius="3xl"
                            justifyContent="flex-start"
                            gap={2}
                            width={64}
                            key={id}
                            size={"md"}
                            leftIcon={Icon}
                            variant="outline"
                            isDisabled={disabled}
                            onClick={() =>
                              void onLogin(provider as AvailableAuthProviders)
                            }
                          >
                            {text}
                          </Button>
                        )
                      )}
                    </VStack>
                  </Center>
                </ModalBody>

                <ModalFooter>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Click “Sign In” to agree to{" "}
                    <Link color="blue.500" href="/">
                      {"Blog-site's Terms of Service"}
                    </Link>{" "}
                    and acknowledge that{" "}
                    <Link color="blue.500" href="/">
                      {"Blog-site's Privacy Policy"}
                    </Link>{" "}
                    applies to you.
                  </Text>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </nav>
        </header>
      </main>
    </>
  );
}
