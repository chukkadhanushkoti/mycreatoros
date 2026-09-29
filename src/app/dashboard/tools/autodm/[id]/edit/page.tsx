"use client";

import { use, useEffect, useState } from "react";

import { getAccessToken } from "@/context/auth-context";
import { autoDmApi, type Campaign } from "@/lib/autodm-api";
import { CampaignWizard } from "@/components/dashboard/autodm/campaign-wizard";

export default function EditAutoDmCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    autoDmApi.getCampaign(token, id).then(setCampaign);
  }, [id]);

  if (!campaign) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="skeleton h-96 rounded-3xl" />
      </div>
    );
  }

  return <CampaignWizard campaignId={id} initial={campaign} />;
}
