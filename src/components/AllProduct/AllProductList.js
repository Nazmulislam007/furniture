import { useSeletedProduct } from '@/Context/ProductInfoProvider/ProductInfoProvider';
import { CustomTableCell } from '@/assets/Custom/tableStyle';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import StatusBtn from './StatusBtn';

export default function AllProductList({ products, selected, setProductId }) {
  const [load, setLoad] = useState(5);
  const { filterValue } = useSeletedProduct() || {};

  const filterProduct =
    products &&
    products.filter((prod) => {
      if (filterValue?.location === 'All area' && filterValue?.vendor === 'All vendor') {
        return prod;
      }
      return prod.location === filterValue?.location || prod.vendor === filterValue?.vendor;
    });

  useEffect(() => {
    setLoad(5);
  }, [products]);

  const loadProduct = filterProduct && filterProduct.slice(0, load);

  return (
    <>
      <Stack>
        <Typography component="p" fontSize={22} pt={1} fontWeight="500">
          All {selected}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell />
                <CustomTableCell />
                <CustomTableCell sx={{ textAlign: 'end' }}>Vendor Price</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadProduct &&
                loadProduct.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <CustomTableCell width="70px">
                      <StatusBtn
                        setProductId={setProductId}
                        product={product}
                        selected={selected}
                      />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Stack direction="row" spacing={1}>
                        <Image src={product.img} height="60" width="60" alt="img" priority />
                        <Box>
                          <Typography component="p">{product.name}</Typography>
                          <Typography
                            component="p"
                            fontSize={14}
                            lineHeight="11px"
                            color="GrayText"
                          >
                            {product.vendor}
                          </Typography>
                          <Typography component="p" fontSize={14} color="GrayText">
                            {product.location}
                          </Typography>
                        </Box>
                      </Stack>
                    </CustomTableCell>
                    <CustomTableCell sx={{ textAlign: 'end', fontWeight: 500 }}>
                      ${product.price}
                    </CustomTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {filterProduct && filterProduct.length > load && (
        <Button variant="text" sx={{ marginTop: 1 }} onClick={() => setLoad((prev) => prev + 5)}>
          Load More
        </Button>
      )}
    </>
  );
}
