import React,{useState,useEffect} from 'react'
import {Button} from "@chakra-ui/react"
import { ethers } from "ethers";
import podcastabi from '../../utils/podcastsabi.json'
import createpodcastabi from '../../utils/createpodcastabi.json'
import Podcastscard from '../../components/PodcastsCard/Podcastscard';
import { Grid, GridItem } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'

export default function Podcasts() {
  useEffect (()=>{
    const handleClick = () =>{
      setPodcastlist(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0xbC3640c29403A8e5A74528f127d676AFA7e35dae",
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
