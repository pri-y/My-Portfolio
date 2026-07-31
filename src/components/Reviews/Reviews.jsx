import { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch Reviews from MongoDB
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (data.success && Array.isArray(data.data)) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setErrorMsg('Please fill in both your name and review message.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        throw new Error(text || `Server returned invalid response (Status ${res.status})`);
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Server error (Status ${res.status})`);
      }

      setName('');
      setComment('');
      setRating(5);
      setSuccessMsg('Thank you! Your review has been submitted successfully.');
      fetchReviews();
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setErrorMsg(`Failed to submit review: ${err.message || 'Server error.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate Average Rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <section id="reviews" className="py-20 px-6 bg-[#F8FAFC] border-y border-[#E2E8F0] font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading & Rating Overview */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B192C] bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-sm">
            Testimonials & Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            Live Reviews & Ratings
          </h2>
          <p className="text-base text-[#475569] leading-relaxed">
            Read authentic feedback from clients, mentors, and collaborators — or leave a review below!
          </p>

          {/* Average Rating Summary Pill */}
          <div className="inline-flex items-center gap-3 bg-white border border-[#E2E8F0] px-6 py-3 rounded-full shadow-sm mt-6">
            <div className="flex items-center text-amber-400 gap-1 text-lg">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}
            </div>
            <span className="text-lg font-extrabold text-[#0F172A]">{averageRating}</span>
            <span className="text-xs font-bold text-[#64748B] border-l border-[#E2E8F0] pl-3">
              ({reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Review Submission Form Card */}
          <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">
              Leave a Review
            </h3>
            <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
              Your feedback is greatly appreciated.
            </p>

            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-extrabold flex items-center gap-2">
                <FaCheckCircle className="text-base text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-extrabold leading-normal">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-2">
                  Select Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl text-amber-400 focus:outline-none transition-transform hover:scale-125"
                    >
                      {star <= (hoverRating || rating) ? <FaStar /> : <FaRegStar className="text-[#CBD5E1]" />}
                    </button>
                  ))}
                  <span className="text-xs font-extrabold text-[#0F172A] ml-2">
                    {hoverRating || rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priyanka / Client / Recruiter"
                  required
                  className="w-full px-4 py-3 text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:border-[#0B192C] focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Your Review / Comment
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience working with Priyanka Gupta..."
                  required
                  className="w-full px-4 py-3 text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:border-[#0B192C] focus:bg-white transition-all resize-none font-sans"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 bg-[#0B192C] text-white font-extrabold text-sm rounded-2xl shadow-md hover:bg-[#1E293B] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          {/* Live Reviews Cards List */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center justify-between px-2 mb-1">
              <h3 className="text-lg font-extrabold text-[#0F172A]">
                Recent Reviews ({reviews.length})
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ● Verified Reviews
              </span>
            </div>

            {loading ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#E2E8F0] text-[#64748B] text-sm">
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#E2E8F0] text-[#64748B]">
                <FaQuoteLeft className="text-3xl text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-[#0F172A] mb-1">No reviews yet!</p>
                <p className="text-xs text-[#64748B]">Be the first person to leave a review using the form.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[620px] overflow-y-auto pr-1">
                {reviews.map((rev) => (
                  <div
                    key={rev._id || rev.id}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0B192C] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                          {rev.name ? rev.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-[#0F172A]">{rev.name}</h4>
                          <span className="text-[10px] font-bold text-[#94A3B8]">
                            {rev.createdAt
                              ? new Date(rev.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : 'Just now'}
                          </span>
                        </div>
                      </div>

                      {/* Star Rating Badge */}
                      <div className="flex items-center gap-1 text-amber-400 text-xs bg-[#FFFDF5] border border-amber-200 px-2.5 py-1 rounded-full">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s}>{s <= (Number(rev.rating) || 5) ? <FaStar /> : <FaRegStar className="text-slate-300" />}</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-[#475569] leading-relaxed italic pl-2 border-l-2 border-[#0B192C] font-sans">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
