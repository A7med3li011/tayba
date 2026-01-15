"use server";

import axios from "axios";

export interface Slider {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface SliderResponse {
  status: string;
  data: Slider[];
}

export async function getSliders(): Promise<Slider[]> {
  try {
    const response = await axios.get<SliderResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sliders/list`,
      {
        timeout: 10000,
      }
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return [];
  }
}
