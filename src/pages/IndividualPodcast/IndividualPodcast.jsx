import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import React,{useEffect, useState} from 'react'
import { ethers } from "ethers";
import { Web3Storage } from 'web3.storage'
import podcastsabi from '../../utils/podcastsabi.json';
import { useAuth } from "@arcana/auth-react";
import { useMediaQuery } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player';

export default function IndividualPodcast() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [speakers, setSpeakers] = useState("");
  const [createdby, setCreatedby] = useState("");
  const [date, setDate] = useState(false);
  const [listeners,setListeners] = useState("1000+");
  const [podcastlink,setPodcastlink] = useState("");
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  const {provider} = useAuth();

  let { id } = useParams();
  // console.log(`id is : ${id}`);

  useEffect(()=>{
    
    const getPodcastDetails = async () => {
      const prov = new ethers.providers.Web3Provider(provider);
      const signer = prov.getSigner();
      const contract = new ethers.Contract(id, podcastsabi, signer);
      setPodcastlink("QmfGGyzHiDerKuJomu5ip2rpaNvQBpgJJ4N7oWjcKx7Am7");
      // console.log(`final podcast link: ipfs.io/ipfs/${podcastlink}`);
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
    }
    getPodcastDetails()
  },[])

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'podcast image'}
            src={`https://ipfs.io/ipfs/${imageurl}/img2.jpg`}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {name}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              {speakers}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={'lg'}>
                {description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Date</ListItem>
                  <ListItem>Listeners</ListItem>{' '}
                  <ListItem>Speakers</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>{date}</ListItem>
                  <ListItem>{listeners}</ListItem>
                  <ListItem>{speakers}</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <ReactAudioPlayer
                src={`https://ipfs.io/ipfs/${podcastlink}`}
                controls
              />
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Start Listening
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}