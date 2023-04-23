import { useRef } from "react";
import {
  Button,
  Center,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  FaDiscord,
  FaFacebookSquare,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { signInWithPopup } from "@/utils";
import { type AvailableAuthProviders } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

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

export default function AuthModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onLogin = (provider: AvailableAuthProviders) => {
    try {
      signInWithPopup(`/auth/${provider}`, "Sign In");
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

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={["sm", "md", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Sign in to your account
          {/* <Heading size="sm" fontWeight="normal">
            Not a member?{" "}
            <Button
              variant="link"
              color="blue.500"
              fontWeight="normal"
              onClick={toggleForm}
            >
              Create an account for free.
            </Button>
          </Heading> */}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6} height="fit-content">
          <Center>
            <VStack spacing={4}>
              {btnGroup.map(({ id, icon: Icon, text, provider, disabled }) => (
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
              ))}
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
  );
}
