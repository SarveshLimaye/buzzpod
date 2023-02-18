import React from 'react'
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
  } from "@chakra-ui/react";
  import { AiOutlineMenu } from "react-icons/ai";

export default function NavBar() {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        h = "100px"
        px={{ base: 6, sm: 4 }}
        py={9}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h3 fontSize='35px' fontWeight="l" ml="2" color="brand.00">
              Buzzpod
            </chakra.h3>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <chakra.a
              href="/podcasts"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            ><Button variant="ghost">Podcasts</Button></chakra.a>
             <chakra.a
              href="/add"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            > <Button variant="ghost">Add Podcasts</Button></chakra.a>
            </HStack>
            <Button colorScheme="brand" size="sm">
              Sign in
            </Button>
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

                <Button w="full" variant="ghost">
                  Podcasts
                </Button>
                <Button w="full" variant="ghost">
                  Add Podcast
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  )
}
