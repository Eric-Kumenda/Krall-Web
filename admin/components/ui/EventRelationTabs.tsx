"use client";

import { useState } from "react";

interface TabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}

const Tab = ({ label, isActive, onClick }: TabProps) => (
	<button
		type="button"
		onClick={onClick}
		className={`px-6 py-3 rounded-t-xl font-medium transition-colors ${
			isActive
				? "bg-gray-800 text-primary border-t-2 border-primary"
				: "bg-gray-900/50 text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
		}`}>
		{label}
	</button>
);

interface EventRelationTabsProps {
	speakersContent: React.ReactNode;
	sponsorsContent: React.ReactNode;
	ticketsContent: React.ReactNode;
}

export default function EventRelationTabs({
	speakersContent,
	sponsorsContent,
	ticketsContent,
}: EventRelationTabsProps) {
	const [activeTab, setActiveTab] = useState<
		"speakers" | "sponsors" | "tickets"
	>("speakers");

	return (
		<div className="w-full">
			<div className="flex items-end gap-1 mb-0 border-b border-gray-800 overflow-x-auto">
				<Tab
					label="Speakers"
					isActive={activeTab === "speakers"}
					onClick={() => setActiveTab("speakers")}
				/>
				<Tab
					label="Sponsors"
					isActive={activeTab === "sponsors"}
					onClick={() => setActiveTab("sponsors")}
				/>
				<Tab
					label="Tickets"
					isActive={activeTab === "tickets"}
					onClick={() => setActiveTab("tickets")}
				/>
			</div>

			<div className="bg-gray-800 rounded-b-2xl p-6 min-h-[300px]">
				{activeTab === "speakers" && (
					<div className="animate-in fade-in duration-300">
						{speakersContent}
					</div>
				)}
				{activeTab === "sponsors" && (
					<div className="animate-in fade-in duration-300">
						{sponsorsContent}
					</div>
				)}
				{activeTab === "tickets" && (
					<div className="animate-in fade-in duration-300">
						{ticketsContent}
					</div>
				)}
			</div>
		</div>
	);
}
