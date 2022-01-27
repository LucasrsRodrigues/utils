import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {

  return (
    <Flex width="100vw" height="100vh" justifyContent="center" padding="200px">
      <Grid templateColumns='repeat(3, 1fr)' gap={6} flex={1}>
        <Link href="/simulador" passHref>
          <GridItem
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-evenly"
            w='300px'
            h='300px'
            cursor="pointer"
            borderRadius="9px"
            bg='purple.800'
            _hover={{ bgColor: 'purple.400', transition: 'background .2s' }}
          >
            {/* <Image src="/assets/icons/juros-composto.svg" alt="Juros compostos"/> */}
            <Image src="/assets/icons/juros-composto.svg" alt="Juros compostos" w="200px" height="auto" />
            <Text fontSize="1.6rem" >Juros compostos</Text>
          </GridItem>
        </Link>

        <Link href="/regra-de-tres" passHref>
          <GridItem
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-evenly"
            w='300px'
            h='300px'
            cursor="pointer"
            borderRadius="9px"
            bg='purple.800'
            _hover={{ bgColor: 'purple.400', transition: 'background .2s' }}
          >
            <Image src="/assets/icons/regra-de-tres-simples.svg" alt="Juros compostos" w="200px" height="auto" />
            <Text fontSize="1.6rem" >Regra de três</Text>
          </GridItem>
        </Link>
      </Grid>
    </Flex>
  )
}
