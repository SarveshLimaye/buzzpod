import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Avatar,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "@arcana/auth-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { isLoggedIn, connect, user } = useAuth();
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const onConnectClick = async () => {
    try {
      await connect();
      console.log(user);
    } catch (err) {
      console.log({ err });
      // Handle error
    }
  };
  return (
    <React.Fragment>
      <chakra.header bg={bg} w="full" h="100px" px={{ base: 6, sm: 4 }} py={5}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Buzzpod</VisuallyHidden>
            </chakra.a>
            <Link to="/">
              <chakra.h3 fontSize="35px" fontWeight="0" ml="2" color="brand.00">
                Buzzpod
              </chakra.h3>
            </Link>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1} mr={5}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link to="/podcasts">
                <chakra.a
                  href="/podcasts"
                  title="Podcasts"
                  display="flex"
                  alignItems="center"
                >
                  <Button variant="ghost">Podcasts</Button>
                </chakra.a>
              </Link>

              {isLoggedIn ? (
                <chakra.a
                  href="/add"
                  title="Add Podcasts"
                  display="flex"
                  alignItems="center"
                >
                  <Link to="/add">
                    <Button variant="ghost">Add Podcasts</Button>
                  </Link>
                </chakra.a>
              ) : null}
            </HStack>
            {!isLoggedIn ? (
              <Button colorScheme="brand" size="sm" onClick={onConnectClick}>
                Sign in
              </Button>
            ) : (
              <Avatar size="sm" name={user?.name} src={user?.picture} />
            )}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Link to="/podcasts">
                  <Button w="full" variant="ghost">
                    Podcasts
                  </Button>
                </Link>
                <Link to="/add">
                  <Button w="full" variant="ghost">
                    Add Podcast
                  </Button>
                </Link>

                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
