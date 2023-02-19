import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Image, chakra } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";
import {
  MdEmail,
  MdHeadset,
  MdLocationOn,
  MdSpeakerPhone,
  MdPeopleAlt,
} from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import podcastsabi from "../../utils/podcastsabi.json";
import { Grid, GridItem } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { useAuth } from "@arcana/auth-react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Podcastscard = ({ individualPodcast }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [speakers, setSpeakers] = useState("");
  const [createdby, setCreatedby] = useState("");
  const [date, setDate] = useState(false);
  const [listeners, setListeners] = useState("");
  const [podcastlink, setPodcastlink] = useState("");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();
  const { provider } = useAuth();

  const handleClick = () => {
    navigate(`podcast/${individualPodcast}`);
  };

  useEffect(() => {
    const getPodcastDetails = async () => {
      const prov = new ethers.providers.Web3Provider(provider);
      const signer = prov.getSigner();
      const contract = new ethers.Contract(
        individualPodcast,
        podcastsabi,
        signer
      );
      contract
        .name()
        .then((result) => {
          setName(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .description()
        .then((result) => {
          setDescription(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .imageURL()
        .then((result) => {
          setImageurl(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .speakers()
        .then((result) => {
          setSpeakers(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .date()
        .then((result) => {
          setDate(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .totalListeners()
        .then((result) => {
          setListeners(result);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPodcastDetails();
  }, []);
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        w="sm"
        mx="auto"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        // transform scale on hover
        _hover={{
          shadow: "2xl",

          transition: "all 0.3s ease",
        }}
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          objectPosition="center"
          src={`https://ipfs.io/ipfs/${imageurl}/img2.jpg`}
          alt="avatar"
          _hover={{
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
          }}
        />

        <Flex alignItems="center" px={6} py={3} bg="gray.900">
          <Icon as={MdHeadset} h={6} w={6} color="white" />

          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
            {date}
          </chakra.h1>
        </Flex>

        <Box py={4} px={6} height="240px" display="flex" flexDirection="column">
          <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{
              color: "white",
            }}
          >
            {name}
          </chakra.h1>

          <chakra.p
            py={2}
            color="gray.700"
            _dark={{
              color: "gray.400",
            }}
            // if there are more than 1 lines of text, truncate it by default and add "..." to the end of the text//
            textOverflow="ellipsis"
            isTruncated
          >
            {description}
          </chakra.p>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <Icon as={MdSpeakerPhone} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {speakers}
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <Icon as={MdPeopleAlt} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              100+
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <Button colorScheme="teal" size="md" onClick={handleClick}>
              Listen
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Podcastscard;
