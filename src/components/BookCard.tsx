"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Rating, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface data {
  data: any;
}

export default function MediaCard({ data }: data) {
  return (
    <Box>
      <Card sx={{ maxWidth: 345, minWidth: 345, height: 650 }}>
        <Link
          href={{ pathname: `/books/view/${data._id}/details` }}
          style={{ textDecoration: "none" }}
        >
          <CardContent className="info">
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography gutterBottom variant="body1">
              {data.author}
            </Typography>
            <CardMedia
              component="img"
              height="480"
              image={data.image}
              alt={data.name}
              title={data.name}
            />
          </CardContent>

          <CardActions>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Total price :{" "}
              </Typography>
              <Typography fontSize="lg" fontWeight="lg" variant="subtitle2">
                {data.price}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Total rating :{" "}
              </Typography>
              <Typography fontSize="lg" fontWeight="lg" variant="subtitle2">
                <Rating name="read-only" value={data.star_rating} readOnly />
              </Typography>
            </Box>
          </CardActions>
        </Link>
      </Card>
    </Box>
  );
}
