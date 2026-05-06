import type { GalleryPhoto } from '@/components/Gallery'

const FILES = [
  '01-01-01-you-with-newborn-car-seat.jpg',
  '02-02-02-you-family-selfie.jpg',
  '03-03-03-possible-you-red-shirt.jpg',
  '04-04-01-newborn-swaddled.jpg',
  '05-05-02-newborn-car-seat.jpg',
  '06-06-03-baby-sleeping-car-seat.jpg',
  '07-07-04-baby-pacifier.jpg',
  '08-08-05-baby-lying-down.jpg',
  '09-09-06-sitting-yellow-top.jpg',
  '10-10-07-sitting-pink-chair.jpg',
  '11-11-08-sitting-cream-outfit.jpg',
  '12-12-09-sitting-pink-chair-close.jpg',
  '13-13-10-sitting-pink-chair-cap.jpg',
  '14-14-11-feeding-closeup.jpg',
  '15-15-12-sitting-pink-chair-grey.jpg',
  '16-16-13-playing-stack-toy.jpg',
  '17-17-14-black-outfit-prayer-card.jpg',
  '18-18-15-black-cap-seated.jpg',
  '19-19-16-black-outfit-seated.jpg',
  '20-20-17-smiling-casual.jpg',
  '21-21-18-party-chair-brown.jpg',
  '22-22-19-blue-outfit-cap.jpg',
  '23-23-20-blue-outfit-closeup.jpg',
  '24-24-21-sunglasses-car-seat.jpg',
  '25-25-22-blue-cap-car-seat.jpg',
  '26-26-23-sunglasses-party.jpg',
  '27-27-24-riding-toy.jpg',
  '28-28-01-family-table-gathering.jpg',
  '29-29-02-children-around-baby.jpg',
  '30-30-03-restaurant-family-group.jpg',
  '31-31-04-baby-with-child.jpg',
  '32-32-05-with-mum-and-family.jpg',
  '33-33-06-with-mum-standing.jpg',
  '34-34-07-with-mum-and-grandma.jpg',
  '35-35-08-with-mum-seated.jpg',
  '36-36-09-mum-kiss.jpg',
  '37-37-10-with-grandma.jpg',
  '38-38-11-with-mum-close.jpg',
  '39-39-12-with-grandparents.jpg',
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
