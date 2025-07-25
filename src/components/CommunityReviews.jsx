export default function CommunityReviews() {
  return (
    <section className="my-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-heading mb-6">Community Reviews</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-main italic mb-2">“Svasam has transformed my daily routine. The Mind sessions are so calming!”</p>
          <div className="text-sm text-main">— Priya S.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-main italic mb-2">“I love the Body and Soul categories. The audio sessions are so easy to follow.”</p>
          <div className="text-sm text-main">— Rahul K.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-main italic mb-2">“Great platform for holistic wellness. The UI is beautiful and easy to use.”</p>
          <div className="text-sm text-main">— Ananya M.</div>
        </div>
      </div>
    </section>
  );
}
