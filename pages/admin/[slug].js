import Metatags from '../../components/Metatags'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import Link from 'next/link'
import toast from 'react-hot-toast'
import AuthCheck from '../../components/AuthCheck'
import { firestore, auth, serverTimestamp } from '../../lib/firebase'
import styles from '../../styles/Admin.module.css'
import { ErrorMessage } from '@hookform/error-message'

export default function AdminPostEdit({}) {
  return (
    <AuthCheck>
      <main>
        <Metatags title="admin page" />
        <PostManager />
      </main>
    </AuthCheck>
  )
}

function PostManager() {
  const [preview, setPreview] = useState(false)
  const router = useRouter()
  const { slug } = router.query

  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug)
  const [post] = useDocumentData(postRef)
  // console.log(post.username)
  // console.log(post.slug)

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? 'Edit' : 'Preview'}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  )
}

function PostForm({ defaultValues, postRef, preview }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    formState,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    criteriaMode: 'all',
  })
  const { isValid, isDirty } = formState

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    })

    reset({ content, published })

    toast.success('Post updated successfully!!')
  }

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}
      <div className={preview ? styles.hidden : styles.controls}>
        <textarea
          name="content"
          {...register('content', {
            required: 'Content is required',
            pattern: {
              value: 20,
              message: 'content is too long',
            },
            maxLength: { value: 20, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
          })}
        ></textarea>
        <ErrorMessage
          errors={errors}
          name="content"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
        <fieldset>
          <input
            className={styles.checkbox}
            name="published"
            type="checkbox"
            {...register('published', { required: false })}
          />
          <label>Published</label>
        </fieldset>
        <button type="submit" className="btn-green">
          Save Changes
        </button>
      </div>
    </form>
  )
}
