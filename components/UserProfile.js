import Image from 'next/image'

export default function UserProfile({ user }) {
  return (
    <div>
      <Image
        src={user.photoURL || '/hacker.png'}
        className="card-img-center"
        alt="profile pic"
        width={50}
        height={50}
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  )
}
