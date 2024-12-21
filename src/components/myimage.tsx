import { Box, Modal } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'


export interface MyImageProps {
    thumbnailUrl: string,
    originalUrl: string
}
function MyImage(props: MyImageProps) {
    const [thumbnail, setThumbnail] = useState(props.thumbnailUrl)
    const [origin, setOrigin] = useState(props.originalUrl)
    const [imgOpen, setImgOpen] = useState(false)

    return (
        <Box>
            <Image
                alt=''
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
                src={thumbnail}
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
                onClick={() => setImgOpen(!imgOpen)}
                unoptimized={true}
                onError={() => setThumbnail("/icons/broken-100x100.png")}
            />
            <Modal open={imgOpen} onClose={() => setImgOpen(!imgOpen)}>
                <Image
                    unoptimized={true}
                    fill={true}
                    style={{ objectFit: 'contain' }}
                    alt=''
                    src={origin}
                    onClick={() => setImgOpen(!imgOpen)}
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
                    onError={() => setOrigin("/icons/broken-image.png")}
                />
            </Modal>
        </Box>
    )
}

export default MyImage