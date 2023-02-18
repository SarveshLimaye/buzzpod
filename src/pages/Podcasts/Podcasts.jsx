import React,{useState,useEffect} from 'react'
import {Button} from "@chakra-ui/react"
import { ethers } from "ethers";
import podcastabi from '../../utils/podcastsabi.json'
import createpodcastabi from '../../utils/createpodcastabi.json'
import Podcastscard from '../../components/PodcastsCard/Podcastscard';
import { Grid, GridItem } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
import { useAuth } from "@arcana/auth-react";

export default function Podcasts() {
  const {provider} = useAuth();
  useEffect (()=>{
    const handleClick = () =>{
      setPodcastlist(true);
      const prov = new ethers.providers.Web3Provider(provider);
      const signer = prov.getSigner();
      const contract = new ethers.Contract(
        "0x94955665Db12D4a2324be6Ae9258Da02F3b32821",
        createpodcastabi,
        signer
      );
      const AllPodcasts = contract.podcasts(10,0);
      AllPodcasts.then((result) => {
        setPodcasts(result);
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    }
    handleClick();
  },[])
  const [podcastlist,setPodcastlist] = useState(false);
  const [podcasts,setPodcasts] = useState([]);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

  return (
    <div>
      {podcasts.length && (
        <div>
          {isLargerThan800 ? (
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
              {podcasts.map((item,index) => (
                <Podcastscard individualPodcast={item} />
              ))}
            </Grid>
          ) : (
            <Grid templateColumns='repeat(1, 1fr)' gap={6}>
              {podcasts.map((item,index) => (
                <Podcastscard individualPodcast={item} />
              ))}
            </Grid>
          )}
        </div>
      )}
    </div>
  )
}
