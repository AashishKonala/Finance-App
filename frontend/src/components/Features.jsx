export default function Features() {
  const features = [
    {
      title: "Expense Tracking",
      desc: "Monitor your daily spending and stay in control.",
      icon: "💸",
    },
    {
      title: "Smart Analytics",
      desc: "Visual insights to understand your financial habits.",
      icon: "📊",
    },
    {
      title: "Budget Planning",
      desc: "Set budgets and achieve your savings goals.",
      icon: "🎯",
    },
    {
      title: "Secure Data",
      desc: "Your financial data is protected with top security.",
      icon: "🔒",
    },
  ];

  return (
    <section className="px-8 py-20 bg-gray-50">
      
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold mb-4">
          Everything You Need to Manage Money
        </h2>
        <p className="text-gray-600">
          Powerful features to simplify your financial life
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-8">
        {features.map((f, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
