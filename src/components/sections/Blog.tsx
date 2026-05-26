import styles from './Blog.module.css'
import { BLOG_POSTS } from '../../data'

export function Blog() {
  return (
    <section className="block" id="blog" style={{ background: 'var(--paper)' }} aria-labelledby="blog-heading">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Blog &amp; Noticias</span>
          <h2 id="blog-heading">Conocimiento que agrega valor.</h2>
          <p>Análisis de mercado, tips técnicos y casos de éxito para productores e inversores del agro.</p>
        </div>

        <div className={styles.grid}>
          {BLOG_POSTS.map((post, i) => (
            <article
              key={post.id}
              className={`${styles.post} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.img}>
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className={styles.cat}>{post.category}</div>
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
              <div className={styles.meta}>{post.readTime}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
