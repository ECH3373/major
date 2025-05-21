'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Screen } from '@/ui';
import { useEffect, useState } from 'react';

export default function Page() {
  const drawers = useDrawers();
  const [images, setImages] = useState([])

  const get = async () => {
    const response = await services.login.index({ limit: 100 })
    setImages(response?.data)
  }

  useEffect(() => {
    get()
  }, [])

  return (
    <Screen>
      <Grid title='Imágenes de login' onCreate={() => drawers.create_image_login({ onSubmit: get })}>
        {images.map((image) => (
          <Item key={image.id} src={image.url} />
        ))}
      </Grid>
    </Screen>
  );
}
