import type { GalleryPhoto } from '@/components/Gallery'

const FILES = [
  '01-01-01-you-with-newborn-car-seat.webp',
  '02-02-02-you-family-selfie.webp',
  '03-03-03-possible-you-red-shirt.webp',
  '04-04-01-newborn-swaddled.webp',
  '05-05-02-newborn-car-seat.webp',
  '06-06-03-baby-sleeping-car-seat.webp',
  '07-07-04-baby-pacifier.webp',
  '08-08-05-baby-lying-down.webp',
  '09-09-06-sitting-yellow-top.webp',
  '10-10-07-sitting-pink-chair.webp',
  '11-11-08-sitting-cream-outfit.webp',
  '12-12-09-sitting-pink-chair-close.webp',
  '13-13-10-sitting-pink-chair-cap.webp',
  '14-14-11-feeding-closeup.webp',
  '15-15-12-sitting-pink-chair-grey.webp',
  '16-16-13-playing-stack-toy.webp',
  '17-17-14-black-outfit-prayer-card.webp',
  '18-18-15-black-cap-seated.webp',
  '19-19-16-black-outfit-seated.webp',
  '20-20-17-smiling-casual.webp',
  '21-21-18-party-chair-brown.webp',
  '22-22-19-blue-outfit-cap.webp',
  '23-23-20-blue-outfit-closeup.webp',
  '24-24-21-sunglasses-car-seat.webp',
  '25-25-22-blue-cap-car-seat.webp',
  '26-26-23-sunglasses-party.webp',
  '27-27-24-riding-toy.webp',
  '28-28-01-family-table-gathering.webp',
  '29-29-02-children-around-baby.webp',
  '30-30-03-restaurant-family-group.webp',
  '31-31-04-baby-with-child.webp',
  '32-32-05-with-mum-and-family.webp',
  '33-33-06-with-mum-standing.webp',
  '34-34-07-with-mum-and-grandma.webp',
  '35-35-08-with-mum-seated.webp',
  '36-36-09-mum-kiss.webp',
  '37-37-10-with-grandma.webp',
  '38-38-11-with-mum-close.webp',
  '39-39-12-with-grandparents.webp',
]

function fileToAlt(filename: string): string {
  // Strip "NN-NN-NN-" prefix and ".jpg", convert dashes to spaces, capitalize first letter
  const stripped = filename
    .replace(/\.[a-z]+$/i, '')
    .replace(/^\d+-\d+-\d+-/, '')
    .replace(/-/g, ' ')
  return stripped.charAt(0).toUpperCase() + stripped.slice(1)
}

export const PHOTOS: GalleryPhoto[] = FILES.map((f) => ({
  src: `/photos/${f}`,
  alt: fileToAlt(f),
}))
