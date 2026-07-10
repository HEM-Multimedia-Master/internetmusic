Client-side cache with background revalidation, or more specifically stale-while-revalidate (SWR).

For example, in a message forum:
- Switch forums and instantly display the latest cached version.
- Trigger a fetch in the background.
- If changes have arrived, refresh the DOM without a hard spinner.
- If there was no cache, only then display loading.

In an app that linearly applies `loadThreads()` and `loadPosts()`, network reloading is used each time. The most impactful improvement would be:
- cache `boards` by `courseId`
- cache `threads` by scope: `lesson:<slug>` or `board:<slug>`
- cache `posts` by `threadId`
- When changing forums, read cache first
- Revalidate in the background with a short TTL, for example `15-30s`
- invalidate that cache when creating/editing/deleting a thread, post, or board
- use `AbortController` or deduplicate requests, in addition to the token you already have

Best practices:
- Keep the old visible while synchronizing, do not empty the panel
- Show a small `updating...` indicator, not a large spinner
- Prefetch only what is likely: hover over the forum switch or `requestIdleCallback`
- Don't prefetch all posts from all forums
- Limit memory with LRU or TTL
- Also revalidate when returning focus to the tab

`SWR / background revalidation + prefetch` greatly improves the UX.

