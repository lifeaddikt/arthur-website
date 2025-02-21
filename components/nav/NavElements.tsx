import Link from 'next/link'
import Instagram from '../icons/Instagram'
import ThemeToggle from '../ThemeToggle'

export const Logo = () => (
  <Link href='/' className='text-4xl font-extrabold uppercase'>
    Arthur <br /> Paumier
  </Link>
)

export const SocialLinks = () => (
  <div className='flex gap-3 text-sm'>
    <Instagram />
    <ThemeToggle />
  </div>
)

export const ContactInfo = () => (
  <div className='flex flex-col gap-3 text-sm'>
    <Instagram />
    <div>
      <p>Contact :</p>
      <a href='mailto:paumier.arthur@gmail.com'>paumier.arthur@gmail.com</a>
    </div>
    <p>&copy; Victor Paumier, {new Date().getFullYear()}</p>
  </div>
)
