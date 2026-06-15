const BACKEND_URL = "https://yourdjango.com";
const NEWS_API_KEY = "your_newsapi_key";

function NewsFeed({ token }) {
  const [articles, setArticles] = useState([]);
  const [readsCount, setReadsCount] = useState(0);

  useEffect(() => {
    // 1. Fetch from external API
    fetch(`https://newsapi.org/v2/top-headlines?country=ng&apiKey=${NEWS_API_KEY}`)
      .then(res => res.json())
      .then(data => setArticles(data.articles));
  }, []);

  const openArticle = async (article) => {
    window.open(article.url, "_blank");

    // 2. Tell Django user read this article
    const res = await fetch(`${BACKEND_URL}/news/log-read/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}` // use Token or Session auth
      },
      body: JSON.stringify({ article_id: article.url })
    });
    
    const data = await res.json();
    setReadsCount(data.reads_this_month || readsCount);
  };

  const claimReward = async () => {
    const res = await fetch(`${BACKEND_URL}/wallet/claim-reward/`, {
      method: "POST",
      headers: { "Authorization": `Token ${token}` }
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <p>Reads this month: {readsCount}/40</p>
      {readsCount >= 40 && <button onClick={claimReward}>Claim ₦104.17</button>}
      
      {articles.map(a => (
        <div key={a.url} style={{marginBottom: 20}}>
          <h3>{a.title}</h3>
          <button onClick={() => openArticle(a)}>Read</button>
        </div>
      ))}
    </div>
  );
}