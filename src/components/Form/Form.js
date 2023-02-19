import React, { useState } from "react"
import {
  Button,
  Box,
  SimpleGrid,
  GridItem,
  chakra,
  Stack,
  Input,
  Textarea,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import { useAuth } from "@arcana/auth-react";
import createPodcastabi from "../../utils/createpodcastabi.json";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage"

export default function Form() {
  const [title, setTitle] = useState("")
  const [speaker, setSpeaker] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [cover, setCover] = useState("")
  const [audio, setAudio] = useState("")
  const [covercid, setCovercid] = useState("")
  const [audiocid, setAudiocid] = useState("")
  const { provider,user } = useAuth()


  console.log(user)

  function makeStorageClient() {
    return new Web3Storage({ token: process.env.REACT_APP_FILECOIN_TOKEN })
  }

  async function storeCover(files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log("stored files with cid:", cid)
    setCovercid(cid)
    return cid
  }

  async function storeAudio(files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log("stored files with cid:", cid)
    setAudiocid(cid)
    return cid
  }

  function onSubmitCover() {
    let cidOfCover = storeCover(cover)
    console.log(cidOfCover)
  }

  function onSubmitAudio() {
    let cidOfAudio = storeAudio(audio)
    console.log(cidOfAudio)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const prov = new ethers.providers.Web3Provider(provider);
    const signer = prov.getSigner()
    const contract = new ethers.Contract(
      "0x5BB1458eeeD0148a76Dc48c695cDaA7B5e81EbE2",
      createPodcastabi,
      signer
    )
    const account = user?.address
    const tx = await contract.createPodcast(
        title,
        description,
        covercid,
        speaker,
        account,
        date,
        0,
        audiocid
    )

    console.log(tx)
  }

  return (
    <div>
      <Box
        bg="#edf3f8"
        _dark={{
          bg: "#111",
        }}
        p={10}
      >
        <Box>
          <SimpleGrid
            display={{
              base: "initial",
              md: "grid",
            }}
            columns={{
              md: 3,
            }}
            spacing={{
              md: 6,
            }}
          >
            <GridItem
              mt={[5, null, 0]}
              colSpan={{
                md: 2,
              }}
            >
              <chakra.form
                shadow="base"
                rounded={[null, "md"]}
                overflow={{
                  sm: "hidden",
                }}
              >
                <Stack
                  px={4}
                  py={5}
                  bg="white"
                  _dark={{
                    bg: "#141517",
                  }}
                  spacing={6}
                  p={{
                    sm: 6,
                  }}
                >
                  <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Title
                      </FormLabel>
                      <Input
                        type="tel"
                        placeholder="Enter suitable Podcast title"
                        focusBorderColor="brand.400"
                        rounded="md"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Speaker Name
                      </FormLabel>
                      <Input
                        type="tel"
                        placeholder="Enter speaker name"
                        focusBorderColor="brand.400"
                        rounded="md"
                        onChange={(e) => setSpeaker(e.target.value)}
                      />
                    </FormControl>
                  </SimpleGrid>

                  <div>
                    <FormControl id="email" mt={1}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                        placeholder="Enter description of podcast"
                      >
                        Description
                      </FormLabel>
                      <Textarea
                        placeholder="you@example.com"
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                          sm: "sm",
                        }}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <FormHelperText>
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Date
                  </FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    onChange={(e) => setDate(e.target.value)}
                  />

                  <input
                    type="file"
                    onChange={(e) => {
                      setCover(e.target.files)
                    }}
                  />

                  <Button
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                    width="50%"
                    onClick={onSubmitCover}
                  >
                    Upload cover image
                  </Button>

                  <input
                    type="file"
                    onChange={(e) => {
                      setAudio(e.target.files)
                    }}
                  />

                  <Button
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                    align="center"
                    width="50%"
                    onClick={onSubmitAudio}
                  >
                    Upload podcast file
                  </Button>
                </Stack>
                <Box
                  px={{
                    base: 4,
                    sm: 6,
                  }}
                  py={3}
                  bg="gray.50"
                  _dark={{
                    bg: "#121212",
                  }}
                  textAlign="right"
                >
                  <Button
                    type="submit"
                    colorScheme="brand"
                    _focus={{
                      shadow: "",
                    }}
                    fontWeight="md"
                    onClick={onSubmit}
                  >
                    Save
                  </Button>
                </Box>
              </chakra.form>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </div>
  )
}
