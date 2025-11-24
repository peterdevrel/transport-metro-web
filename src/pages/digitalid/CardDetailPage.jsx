import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContainerTitle } from "../../Components/ContainerTitle";

const CardDetailPage = () => {
  const { user_id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardDetails = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}d/api/card/${user_id}/`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setCard(data);
      } catch (error) {
        console.error("Error fetching card details:", error);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    if (user_id) getCardDetails();
  }, [user_id]);

  if (loading) return <p className="text-center mt-5">Loading card details...</p>;
  if (!card) return <p className="text-center mt-5">Card not found.</p>;

  const getBadgeColor = (field, value) => {
    if (field === "delivery") {
      if (value === "Delivered") return "badge bg-success";
      if (value === "In-Progress") return "badge bg-warning text-dark";
      return "badge bg-secondary";
    }
    if (field === "paid") return value ? "badge bg-success" : "badge bg-danger";
    if (field === "status") return "badge bg-primary";
    return "badge bg-secondary";
  };

  return (
    <ContainerTitle>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
            <h2 className="card-title mb-4 text-center">Card Processing Details</h2>
            <div className="card-body">
                <p><strong>Email:</strong> {card.email || card.user?.email}</p>
                <p>
                <strong>Type:</strong>{" "}
                <span className="badge bg-info">{card.card_type}</span>
                </p>
                <p>
                <strong>Status:</strong>{" "}
                <span className={getBadgeColor("status", card.status_type)}>
                    {card.status_type}
                </span>
                </p>
                <p>
                <strong>Delivery:</strong>{" "}
                <span className={getBadgeColor("delivery", card.physical_card_delivered ? "Delivered" : "In-Progress")}>
                    {card.physical_card_delivered ? "Delivered" : "In-Progress"}
                </span>
                </p>
                <p>
                <strong>Paid:</strong>{" "}
                <span className={getBadgeColor("paid", card.paid)}>
                    {card.paid ? "Yes" : "No"}
                </span>
                </p>
                <p><strong>Address:</strong> {card.delivery_address || "N/A"}</p>
                <p><strong>Phone:</strong> {card.phone_number || "N/A"}</p>
                <p>
                <strong>Description:</strong>{" "}
                <span>
                    {card.description}
                </span>
                </p>
                <p>
                <strong>Updated At:</strong>{" "}
                {new Date(card.updatedAt).toLocaleString()}
                </p>
                <p>
                <strong>Created At:</strong>{" "}
                {new Date(card.createdAt).toLocaleString()}
                </p>
                <p><a href="/" className="btn btn-primary"><i className="fa">&#xf0a8;</i> Back to home page</a></p>
            </div>
            </div>
        </div>
    </ContainerTitle>

  );
};

export default CardDetailPage;
