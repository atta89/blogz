/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, Fragment } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import {
  TrendingFlatRounded,
  EastRounded,
  WestRounded,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";

import { Page, PostType } from "@/types";

const Index: Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(`/posts?page=${page}&per_page=5`)
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {!isLoading &&
        data.map((item, index) => (
          <Fragment key={index}>
            <Divider />
            <Grid py={5} container spacing={2}>
              <Grid item lg={3}>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="text.secondary"
                >
                  {moment().format("LL")}
                </Typography>
              </Grid>
              <Grid item lg={9}>
                <Typography variant="h2">{item.title}</Typography>
                <Typography
                  my={3}
                  variant="body1"
                  color="text.secondary"
                  lineHeight={1.8}
                >
                  {item.body.substring(0, 150)}...
                </Typography>
                <Button
                  color="secondary"
                  endIcon={<TrendingFlatRounded />}
                  onClick={() => router.push(`/blog/${item.id}`)}
                >
                  Read more
                </Button>
              </Grid>
            </Grid>
          </Fragment>
        ))}
      {!isLoading && (
        <Grid mb={5} container justifyContent="space-between">
          <Grid item>
            <Button
              color="inherit"
              disabled={page === 1}
              startIcon={<WestRounded />}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="inherit"
              endIcon={<EastRounded />}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

Index.title = "Blog";

export default Index;
