import React,{useEffect, useState} from 'react'
import { Box, Flex, Icon, Image, chakra } from "@chakra-ui/react";
import { ethers } from "ethers";
import { MdEmail, MdHeadset, MdLocationOn ,MdSpeakerPhone, MdPeopleAlt} from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import podcastsabi from '../../utils/podcastsabi.json';
import { Grid, GridItem } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'

const Podcastscard = ({individualPodcast}) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [speakers, setSpeakers] = useState("");
  const [createdby, setCreatedby] = useState("");
  const [date, setDate] = useState(false);
  const [listeners,setListeners] = useState("");
  const [podcastlink,setPodcastlink] = useState("");
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

  useEffect(()=>{
    const getPodcastDetails = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(individualPodcast, podcastsabi, signer);
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
    }
    getPodcastDetails();
  },[])
  return (
    <Flex
      
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
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
    >
      <Image
        w="full"
        h={56}
        fit="cover"
        objectPosition="center"
        src={imageurl}
        alt="avatar"
      />
  
      <Flex alignItems="center" px={6} py={3} bg="gray.900">
        <Icon as={MdHeadset} h={6} w={6} color="white" />
  
        <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
          {date}
        </chakra.h1>
      </Flex>
  
      <Box py={4} px={6}>
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
      </Box>
    </Box>
  </Flex>
    
  )
}

export default Podcastscard