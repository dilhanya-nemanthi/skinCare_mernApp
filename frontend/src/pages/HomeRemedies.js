import React, { useState } from 'react';

// Initial dataset of scientifically-backed or classic natural skincare remedies
const INITIAL_REMEDIES = [
  {
    id: 1,
    name: "Honey & Oatmeal Soothing Mask",
    concern: "dry",
    ingredients: ["1 tbsp Colloidal Oatmeal", "1 tbsp Raw Honey", "1 tbsp Plain Yogurt"],
    steps: [
      "Mix the colloidal oatmeal, raw honey, and yogurt in a small bowl to form a smooth paste.",
      "Apply evenly to clean skin, avoiding the immediate eye area.",
      "Leave on for 15-20 minutes.",
      "Rinse gently with lukewarm water, massaging in circular motions. Pat dry and follow with moisturizer."
    ],
    whyItWorks: "Colloidal oatmeal binds to the skin and creates a protective barrier, locking in moisture while calming inflammation. Raw honey is a natural humectant that pulls moisture from the air into the skin. Yogurt contains lactic acid, a mild Alpha Hydroxy Acid (AHA) that gently dissolves flaky, dead skin cells.",
    frequency: "2-3 times a week",
    safetyTip: "Ensure the oatmeal is finely ground (colloidal) so it doesn't scratch or irritate the skin barrier."
  },
  {
    id: 2,
    name: "Green Tea & Aloe Calming Mist",
    concern: "sensitive",
    ingredients: ["1 organic Green Tea bag", "1/2 cup distilled water", "2 tbsp pure Aloe Vera gel"],
    steps: [
      "Steep the green tea bag in hot water for 10 minutes, then let it cool completely.",
      "Mix the cooled green tea with pure aloe vera gel until fully incorporated.",
      "Pour into a clean spray bottle and shake well before each use.",
      "Mist onto face after cleansing or throughout the day to calm redness."
    ],
    whyItWorks: "Green tea is rich in epigallocatechin gallate (EGCG), a potent polyphenol that reduces skin redness and inflammation. Aloe vera contains vitamins, minerals, and salicylic acid that soothe irritation and speed up skin healing.",
    frequency: "Daily, as needed",
    safetyTip: "Store in the refrigerator and discard after 7-10 days, as it contains no artificial preservatives."
  },
  {
    id: 3,
    name: "Clay & Apple Cider Vinegar Clarifying Mask",
    concern: "oily",
    ingredients: ["1 tbsp Bentonite Clay", "1 tbsp Apple Cider Vinegar (ACV)", "1-2 drops Tea Tree essential oil"],
    steps: [
      "Combine the bentonite clay and apple cider vinegar in a non-metal bowl (metal deactivates the clay).",
      "Stir well until a smooth clay paste is formed. Add a drop or two of tea tree oil.",
      "Apply a thin layer to oily zones (T-zone) or the whole face, avoiding the eyes.",
      "Allow to dry for 10-15 minutes (you will feel a tightening sensation), then rinse thoroughly with warm water."
    ],
    whyItWorks: "Bentonite clay carries a strong negative electrical charge, which attracts and binds to positively charged toxins, heavy metals, and excess sebum in pores. Apple cider vinegar helps balance skin pH, while tea tree oil provides strong antibacterial action against acne-causing bacteria.",
    frequency: "Once a week",
    safetyTip: "Do not use a metal spoon or bowl when mixing bentonite clay. Always dilute apple cider vinegar to prevent chemical burns."
  },
  {
    id: 4,
    name: "Turmeric & Yogurt Brightening Mask",
    concern: "brightening",
    ingredients: ["1/2 tsp Organic Turmeric powder", "1 tbsp Plain Greek Yogurt", "1 tsp Lemon juice"],
    steps: [
      "Mix the turmeric powder, Greek yogurt, and lemon juice together until uniform.",
      "Apply to your face, paying special attention to areas with hyperpigmentation.",
      "Leave on for 10-12 minutes. Be careful not to leave it too long, as turmeric can temporarily stain pale skin.",
      "Rinse with lukewarm water and cleanse gently if a yellow tint remains."
    ],
    whyItWorks: "Turmeric contains curcumin, which inhibits melanogenesis (dark spot creation) and offers powerful anti-inflammatory and antioxidant benefits. Lemon juice contains vitamin C and citric acid, which clarify and brighten, while yogurt moisturizes and refines skin texture.",
    frequency: "1-2 times a week",
    safetyTip: "Turmeric can stain clothing. Apply a spot test first to ensure you do not experience irritation from the lemon juice."
  },
  {
    id: 5,
    name: "Honey & Cinnamon Spot Treatment",
    concern: "acne",
    ingredients: ["1 tbsp Raw Honey", "1/2 tsp Ground Cinnamon"],
    steps: [
      "Thoroughly mix the raw honey and cinnamon powder together.",
      "Dab a small amount directly onto active acne breakouts or blemishes.",
      "Leave on for 10-15 minutes.",
      "Rinse off completely with warm water and pat dry."
    ],
    whyItWorks: "Honey is a natural antibacterial agent that suppresses acne-causing bacteria and accelerates wound healing. Cinnamon contains cinnamaldehyde, which has strong antimicrobial and anti-inflammatory benefits to reduce swelling.",
    frequency: "As a spot treatment, daily or every other day",
    safetyTip: "Cinnamon can be irritating to sensitive skin. Do a patch test on your inner arm first."
  },
  {
    id: 6,
    name: "Cucumber & Mint Cooling Eye Pad",
    concern: "sensitive",
    ingredients: ["1/2 fresh Cucumber", "5-6 fresh Mint leaves", "2 round cotton pads"],
    steps: [
      "Blend or grate the cucumber and mint leaves together, then squeeze out the juice through a mesh strainer.",
      "Soak two cotton pads in the cold juice.",
      "Place the pads over closed eyes and relax for 15 minutes.",
      "Remove and rinse with cool water."
    ],
    whyItWorks: "Cucumber contains ascorbic acid (vitamin C) and caffeic acid, which reduce water retention and puffiness. Mint provides a cooling sensation that constricts blood vessels, helping to reduce under-eye dark circles and puffiness.",
    frequency: "Daily or after long days",
    safetyTip: "Avoid letting the juice enter the eyes directly to prevent stinging."
  }
];

export default function HomeRemedies() {
  const [remedies, setRemedies] = useState(INITIAL_REMEDIES);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    concern: 'acne',
    ingredients: '',
    steps: '',
    whyItWorks: '',
    frequency: '',
    safetyTip: ''
  });
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Concern categories
  const categories = [
    { id: 'all', label: 'All Remedies' },
    { id: 'acne', label: 'Acne & Blemishes' },
    { id: 'dry', label: 'Dry Skin' },
    { id: 'oily', label: 'Oily Skin' },
    { id: 'sensitive', label: 'Sensitive Skin' },
    { id: 'brightening', label: 'Brightening' }
  ];

  // Handle accordion toggle
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle filter selection
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setExpandedId(null);
  };

  // Filter & Search dataset
  const filteredRemedies = remedies.filter((remedy) => {
    const matchesCategory = activeFilter === 'all' || remedy.concern === activeFilter;
    const matchesSearch =
      remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      remedy.whyItWorks.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError('');
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, concern, ingredients, steps, whyItWorks, frequency, safetyTip } = formData;

    if (!name.trim() || !ingredients.trim() || !steps.trim() || !whyItWorks.trim()) {
      setFormError('Please fill out all required fields (Name, Ingredients, Steps, and Scientific Benefit).');
      return;
    }

    const newRemedy = {
      id: Date.now(),
      name: name.trim(),
      concern,
      ingredients: ingredients.split(',').map(item => item.trim()).filter(Boolean),
      steps: steps.split('\n').map(item => item.trim()).filter(Boolean),
      whyItWorks: whyItWorks.trim(),
      frequency: frequency.trim() || 'As needed',
      safetyTip: safetyTip.trim() || 'Do a patch test before regular use.'
    };

    setRemedies([newRemedy, ...remedies]);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      concern: 'acne',
      ingredients: '',
      steps: '',
      whyItWorks: '',
      frequency: '',
      safetyTip: ''
    });

    // Reset success animation state after 4 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  return (
    <div className="remedies-container">
      <div className="remedies-hero">
        <h2>Natural Skincare Remedies</h2>
        <p>Explore safe, simple, and scientifically-explained home remedies crafted from fresh, natural ingredients. Learn what works for your skin type and why.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="controls-section">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by ingredient or remedy name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>&times;</button>
          )}
        </div>

        <div className="filter-chips">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`chip ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Remedies List */}
      <div className="remedies-grid">
        {filteredRemedies.length > 0 ? (
          filteredRemedies.map((remedy) => {
            const isExpanded = expandedId === remedy.id;
            return (
              <div
                key={remedy.id}
                className={`remedy-card ${isExpanded ? 'expanded' : ''} concern-${remedy.concern}`}
                onClick={() => toggleExpand(remedy.id)}
              >
                <div className="remedy-header">
                  <div className="remedy-title-block">
                    <span className={`badge badge-${remedy.concern}`}>
                      {remedy.concern.toUpperCase()}
                    </span>
                    <h3>{remedy.name}</h3>
                  </div>
                  <span className="expand-indicator">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>

                <div className="remedy-preview-desc">
                  <p>{remedy.whyItWorks.substring(0, 110)}...</p>
                  <span className="read-more-text">Click to read details</span>
                </div>

                {isExpanded && (
                  <div className="remedy-details" onClick={(e) => e.stopPropagation()}>
                    <div className="details-grid">
                      <div className="details-col-left">
                        <h4>Ingredients</h4>
                        <ul className="ingredients-list">
                          {remedy.ingredients.map((ing, index) => (
                            <li key={index}>
                              <svg className="bullet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              {ing}
                            </li>
                          ))}
                        </ul>

                        <div className="meta-info-box">
                          <div className="meta-item">
                            <h5>Frequency</h5>
                            <p>{remedy.frequency}</p>
                          </div>
                          {remedy.safetyTip && (
                            <div className="meta-item warning-box">
                              <h5>Safety & Tips</h5>
                              <p>{remedy.safetyTip}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="details-col-right">
                        <h4>Preparation & Steps</h4>
                        <ol className="steps-list">
                          {remedy.steps.map((step, index) => (
                            <li key={index}>
                              <span className="step-num">{index + 1}</span>
                              <p>{step}</p>
                            </li>
                          ))}
                        </ol>

                        <div className="why-works-box">
                          <h4>Why It Works (Scientific Basis)</h4>
                          <p>{remedy.whyItWorks}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <h3>No remedies found</h3>
            <p>Try matching another concern or refining your search term.</p>
          </div>
        )}
      </div>

      {/* Share / Submit Remedy Form */}
      <div className="submit-section">
        <div className="submit-intro">
          <h3>Submit Your Secret Home Remedy</h3>
          <p>Have a natural recipe that worked wonders for your skin? Share it with the GlowIQ community! Your recipe will be validated and displayed instantly below.</p>
        </div>

        {submitSuccess ? (
          <div className="success-banner animate-fade-in">
            <div className="success-check-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4>Thank you!</h4>
            <p>Your skincare remedy has been added successfully to the top of the remedies list.</p>
          </div>
        ) : (
          <form className="submit-form" onSubmit={handleSubmit}>
            {formError && <div className="form-error-banner">{formError}</div>}
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="name">Remedy Title *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Avocado & Honey Nourishing Mask"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="concern">Primary Skin Concern *</label>
                <select
                  id="concern"
                  name="concern"
                  value={formData.concern}
                  onChange={handleInputChange}
                >
                  <option value="acne">Acne & Blemishes</option>
                  <option value="dry">Dry Skin</option>
                  <option value="oily">Oily Skin</option>
                  <option value="sensitive">Sensitive Skin</option>
                  <option value="brightening">Brightening / Dull Skin</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="frequency">Recommended Frequency</label>
                <input
                  type="text"
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  placeholder="e.g., 2-3 times a week"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="ingredients">Ingredients (comma-separated list) *</label>
                <input
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  placeholder="e.g., 1/2 ripe avocado, 1 tbsp organic honey, 1 tsp yogurt"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="steps">Preparation & Steps (each step on a new line) *</label>
                <textarea
                  id="steps"
                  name="steps"
                  rows="4"
                  value={formData.steps}
                  onChange={handleInputChange}
                  placeholder="e.g., Mash avocado in a small bowl until completely smooth.&#10;Add honey and mix until paste-like.&#10;Apply to face for 15 minutes."
                  required
                ></textarea>
              </div>

              <div className="form-group full-width">
                <label htmlFor="whyItWorks">Why It Works (Scientific or Natural benefits) *</label>
                <textarea
                  id="whyItWorks"
                  name="whyItWorks"
                  rows="3"
                  value={formData.whyItWorks}
                  onChange={handleInputChange}
                  placeholder="e.g., Avocado is loaded with oleic acid and healthy fats that moisturize the skin barrier, while honey locks in hydration."
                  required
                ></textarea>
              </div>

              <div className="form-group full-width">
                <label htmlFor="safetyTip">Safety Warnings / Extra Tips</label>
                <input
                  type="text"
                  id="safetyTip"
                  name="safetyTip"
                  value={formData.safetyTip}
                  onChange={handleInputChange}
                  placeholder="e.g., Do a patch test if you have sensitive skin."
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Share Remedy
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
