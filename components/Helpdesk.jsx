"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { MyContext } from "@/context/MyContext";
import DynamicTable from "./DynamicTable";
import SelectCategory from "./SelectCategory"
const HelpDesk = () => {
  const { user } = useContext(MyContext);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [reopenDialogOpen, setReopenDialogOpen] = useState(false);
  const [conversationDialogOpen, setConversationDialogOpen] = useState(false);
  const [issueMessage, setIssueMessage] = useState("");
  const [reopenMessage, setReopenMessage] = useState("");
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [category, setCategory] = useState(""); // State for selected category

  // Fetch queries and filter based on the selected filter
  const fetchQueries = async () => {
    try {
      const q = query(
        collection(db, "userQueries"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const queriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        customerName: doc.data().customerName,
        email: doc.data().email,
        category: doc.data().category,
        createdAt: new Date(doc.data().createdAt.toDate()).toLocaleDateString(),
        openMessage: doc.data().openMessage,
        resolvedMessage: doc.data().resolvedMessage || "",
        reopenedMessage: doc.data().reopenedMessage || "",
        closedMessage: doc.data().closedMessage || "",
        status: doc.data().status,
        queryId: doc.data().queryId,
        userId: doc.data().userId,
      }));
      const data = queriesData.filter((query) => query.userId === user?.userId);
      setQueries(data.reverse());
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchQueries();
    }
  }, [user]);

  const handleSubmitIssue = async () => {
    if (!issueMessage || !category) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const queryId = `UQ${Date.now()}`;

    try {
      const queryRef = doc(db, "userQueries", queryId);

      await setDoc(queryRef, {
        category,
        customerName: user.name,
        email: user.email,
        openMessage: issueMessage,
        status: "Opened",
        createdAt: new Date(),
        resolvedMessage: "",
        closedMessage: "",
        reopenedMessage: "",
        queryId: queryId,
        userId: user.userId,
      });

      toast.success("Issue submitted successfully!");
      setIssueDialogOpen(false);
      setIssueMessage("");
      setCategory("");
      fetchQueries();
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast.error("Failed to submit issue. Please try again.");
    }
  };

  const handleOpenReopenModal = (queryId) => {
    setSelectedQueryId(queryId);
    setReopenDialogOpen(true);
  };

  const handleSubmitReopen = async () => {
    if (!reopenMessage) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      const queryRef = doc(db, "userQueries", selectedQueryId);

      await updateDoc(queryRef, {
        status: "Reopened",
        reopenedMessage: reopenMessage,
      });

      toast.success("Issue reopened!");
      setReopenDialogOpen(false);
      setReopenMessage("");
      fetchQueries();
    } catch (error) {
      console.error("Error reopening issue:", error);
      toast.error("Failed to reopen issue. Please try again.");
    }
  };

  const tableHeadings = ["Query ID", "Category", "Date", "", ""];
  const handleRowAction = (queryId) => {
    handleOpenConversationModal(queryId);
  };

  const handleOpenConversationModal = (queryId) => {
    const query = queries.find((q) => q.id === queryId);
    if (query) {
      setSelectedQuery(query);
      setConversationDialogOpen(true);
    } else {
      toast.error("Failed to open conversation. Query not found.");
    }
  };

  return (
    <div className="min-h-screen bg-oohpoint-grey-200 w-screen max-w-[30rem] mx-auto flex flex-col items-center  overflow-y-scroll relative ">
      <div className="py-6 sm:px-4 px-1 bg-[#341266] w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Helpdesk</h2>
        <div className="border-t border-[#646464] w-full px-5"></div>
      </div>

      <div className="flex justify-end items-center m-4 mr-8 w-full">
        <button
          className="bg-oohpoint-primary-2 hover:bg-oohpoint-primary-3 text-white py-2 px-6 rounded-xl hover:scale-95 transition-all"
          onClick={() => setIssueDialogOpen(true)}
        >
          Raise an Issue
        </button>
      </div>
      <DynamicTable
        headings={tableHeadings}
        data={queries.map((query) => ({
          id: query.id,
          "Phone Number": query.category,
          Date: query.createdAt,
          action: query.status === "Resolved" ? "Reopen" : query.status,
          view: "View",
        }))}
        functionn={handleOpenReopenModal}
        view={handleRowAction}
      />
      {/* <SelectCategory /> */}

      {/* Dialog for raising a new issue */}
      {issueDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all">
          <div className="bg-white p-6 px-10 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Raise an Issue</h2>

            {/* Category Dropdown */}
            <select
              className="w-full border rounded-3xl p-4 mb-4 bg-oohpoint-grey-200 font-light"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              <option value="Account Related">Account related</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              className="w-full border rounded-3xl p-4 mb-4 bg-oohpoint-grey-200 font-light"
              rows="4"
              placeholder="Describe your issue"
              value={issueMessage}
              onChange={(e) => setIssueMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-xl hover:bg-gray-600"
                onClick={() => setIssueDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-oohpoint-primary-2 text-white py-2 px-6 rounded-xl hover:bg-oohpoint-primary-3"
                onClick={handleSubmitIssue}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog for viewing conversations */}
      {conversationDialogOpen && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all ">
          <div className="bg-white p-6 px-10 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              Query Details - {selectedQuery.queryId}
            </h2>
            <div className="mb-4">
              <h3 className="font-semibold">Open Message:</h3>
              <p className="bg-oohpoint-grey-200 rounded-3xl p-4">
                {selectedQuery.openMessage}
              </p>
            </div>
            {selectedQuery.resolvedMessage && (
              <div className="mb-4">
                <h3 className="font-semibold">Resolved Message:</h3>
                <p className="bg-oohpoint-grey-200 rounded-3xl p-4">
                  {selectedQuery.resolvedMessage}
                </p>
              </div>
            )}
            {selectedQuery.reopenedMessage && (
              <div className="mb-4">
                <h3 className="font-semibold">Reopened Message:</h3>
                <p className="bg-oohpoint-grey-200 rounded-3xl p-4">
                  {selectedQuery.reopenedMessage}
                </p>
              </div>
            )}
            {selectedQuery.closedMessage && (
              <div className="mb-4">
                <h3 className="font-semibold">Closed Message:</h3>
                <p className="bg-oohpoint-grey-200 rounded-3xl p-4">
                  {selectedQuery.closedMessage}
                </p>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-xl hover:bg-gray-600"
                onClick={() => setConversationDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog for reopening an issue */}
      {reopenDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all">
          <div className="bg-white p-6 px-10 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Reopen Issue</h2>
            <textarea
              className="w-full border rounded-3xl p-4 mb-4 bg-oohpoint-grey-200 font-light"
              rows="4"
              placeholder="Enter reason to reopen"
              value={reopenMessage}
              onChange={(e) => setReopenMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-xl hover:bg-gray-600"
                onClick={() => setReopenDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-oohpoint-primary-2 text-white py-2 px-6 rounded-xl hover:bg-oohpoint-primary-3"
                onClick={handleSubmitReopen}
              >
                Reopen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpDesk;
