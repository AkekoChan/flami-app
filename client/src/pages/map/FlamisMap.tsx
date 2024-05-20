import L, { DivIcon, Icon, LatLng } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import TopBar from "../../components/topbar/TopBar";
import {
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import { APIHandler } from "../../utils/api/api-handler";
import { useCallback, useEffect, useState } from "react";
import { LinkComponent } from "../../components/ui";

interface WorldFlami {
  user_id: string;
  flami_id: string;
  created_at: string;
  count: number;
  position: {
    latitude: number; 
    longitude: number;
  };
}

const FlamisMap = () => {
  const [flamis, setFlamis] = useState<WorldFlami[]>([]);
  const [flamiTradeRecord, setFlamiTradeRecord] = useState(0);
  const [lastTrade, setLastTrade] = useState<string>("");

  const getAllFlamis = useCallback(() => {
    APIHandler<WorldFlami[]>(
      "/misc/world/flamis",
      false,
      "GET",
      undefined,
    ).then(async (res) => {
      if(!res.data) return;
      console.log(res.data);
      setFlamis(res.data);

      let flamiRecord = 0;
      res.data.map(flami => {
        if(flami.count > flamiRecord) flamiRecord = flami.count;
      });

      setFlamiTradeRecord(flamiRecord);
      setLastTrade(res.data[0].created_at);
    })
  }, []);

  useEffect(() => {
    getAllFlamis()
  }, [getAllFlamis]);

  const WorldFlamiIcon = new Icon({
    className: "flami-egg",
    iconUrl: "/assets/img/icons/flami-egg.svg",
    iconSize: [30, 30],
  });

  const createCustomClusterIcon = (cluster: L.MarkerCluster) => {
    let children = cluster.getChildCount();

    let title = document.createElement('span');
    title.textContent = `${children}`;

    let iconImage = WorldFlamiIcon.createIcon();
    let container = document.createElement('div');
    container.className = "flami-egg-container";
    container.style.cssText = `--children: ${children}; --rspeed: ${1.4 * Math.floor(Math.random() * 4 + 1)}s`;

    container.appendChild(title);
    container.appendChild(iconImage);

    const _Icon = new DivIcon({
      className: "flami-egg",
      iconUrl: "/assets/img/icons/flami-egg.svg",
      iconSize: [30, 30],
      html: container
    });

    return _Icon;
  };

  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Flamis dans le monde" hasReturn={true} prevPage="/welcome"/>
      <div>
        <MapContainer
          center={new LatLng(46.631135, 2.4558763)}
          zoom={5}
          maxZoom={16}
          scrollWheelZoom={true}
          attributionControl={true}
          style={{ borderRadius: "1rem", padding: "10px", border: "2px solid #e6e6e6", paddingBottom: "80%" }}
        >

          <MarkerClusterGroup chunkedLoading zoomToBoundsOnClick={true} maxClusterRadius={5} spiderfyOnMaxZoom={false} showCoverageOnHover={false} iconCreateFunction={createCustomClusterIcon}>
            { flamis ? flamis.map(worldFlami => <Marker
              key={worldFlami.flami_id}
                zIndexOffset={100}
                position={[
                  worldFlami.position.latitude || 9999,
                  worldFlami.position.longitude || -9999,
                ]}
                icon={WorldFlamiIcon}
                // icon={new DivIcon({
                //   className: 'flami-icon-marker',
                //   html: `<span>${worldFlami.flami_id}</span>`
                // })}
              >
              </Marker>) : null }
          </MarkerClusterGroup>

          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />
        </MapContainer>    
      </div>
      <div className="text-base flex flex-col gap-2">
        <p><b>{flamis?.length || "?"}</b> Flamis ont été échangés dans le monde</p>
        <p>Le record d'échanges avec un même Flami est de <b>{flamiTradeRecord}</b></p>
        <p>Dernier échange réalisé le <b>{lastTrade ? new Date(lastTrade).toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        }) : "???"}</b></p>
      </div>

      <LinkComponent to="/" variant={"primary"}>
        J'échange mon Flami !
      </LinkComponent>
    </div>
  );
};

export default FlamisMap;
