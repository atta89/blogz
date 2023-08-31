/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";

import { CommentType, Page, PostType, UserType } from "@/types";

const BlogDetail: Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<PostType>();
  const [user, setUser] = useState<UserType>();
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchData();
    fetchComment();
  }, [id]);

  useEffect(() => {
    if (!data?.user_id) return;
    fetchUser();
  }, [data?.user_id]);

  const fetchData = async () => {
    await axios
      .get(`/posts/${id}`)
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUser = async () => {
    await axios
      .get(`/users/${data?.user_id}`)
      .then((res) => {
        const { data } = res;
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComment = async () => {
    await axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        const { data } = res;
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Typography
        mb={2}
        variant="body1"
        textAlign="center"
        fontWeight={500}
        color="text.secondary"
      >
        {moment().format("dddd, LL")}
      </Typography>
      <Typography mb={3} variant="h1" textAlign="center">
        {data?.title}
      </Typography>
      <Divider />
      <Grid container>
        {user && (
          <Grid item xs={12} lg={3}>
            <Grid
              py={5}
              container
              spacing={1}
              alignItems="center"
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <Grid item>
                <Avatar>{user?.name.charAt(0)}</Avatar>
              </Grid>
              <Grid item>
                <Typography variant="body2" fontWeight={500} lineHeight={1.5}>
                  {user?.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="secondary"
                  lineHeight={1.5}
                >
                  {user?.email.substring(0, 20)}...
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        )}
        <Grid item lg={!user ? 12 : 9}>
          <Typography
            m={3}
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
          >
            {data?.body}
          </Typography>
          <Divider />
          <Typography pb={3} pt={5} variant="h4">
            {comments.length} comments
          </Typography>
          {comments.map((comment, index) => (
            <Card key={index} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {comment.name.charAt(0)}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      {comment.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {moment().format("ll")}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography mt={2} variant="body2">
                  {comment.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

BlogDetail.title = "Blog";

export default BlogDetail;
