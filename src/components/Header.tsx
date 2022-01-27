import { Box, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

function Header() {
  return (
    <Box width='100%'>
      <Link href="/" passHref>
        <Icon
          as={BsChevronLeft}
          color="purple.400"
          fontSize="2rem"
          cursor='pointer'
        />
      </Link>
    </Box>
  )
}

export { Header };