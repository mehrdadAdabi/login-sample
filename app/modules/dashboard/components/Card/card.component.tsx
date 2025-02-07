import Image from "next/image";
import { Job } from "./types/card.type";
import {
  AddBox,
  AddToPhotos,
  Bookmark,
  Code,
  EuroSymbol,
  Flag,
  FlagSharp,
  Laptop,
  Person,
  Share,
  Timer,
  TimeToLeave,
  Work,
} from "@mui/icons-material";

function CardComponent(props: Job) {
  const formatDate = (date: Date): string => {
    const item = new Date(date);
    return item.toDateString();
  };

  return (
    <>
      <div className="baseCard bg-darkGray p-3 rounded-xl overflow-hidden">
        <header className="flex gap-2 justify-end">
          <Share className="text-foreground" fontSize="small" />
          <Bookmark className="text-foreground" fontSize="small" />
        </header>
        <div className="about flex flex-col gap-3 pb-3 border-b border-dashed border-white">
          <Image
            className="rounded-md"
            src={props.item.company.imageURL}
            width={40}
            height={40}
            alt={props.item.company.name}
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-white">{props.item.title}</span>
            <span className="text-primaryGreen">{props.item.company.name}</span>
            <div className="text-lightGray">
              <span>Posted date:</span>
              <span>{formatDate(props.item.datePosted)}</span>
            </div>
          </div>
        </div>

        <div className="info flex flex-col gap-2 pt-3">
          <div className="flex gap-1 justify-between">
            <div className="flex gap-1 items-center text-foreground text-sm">
              <Work className="text-foreground" fontSize="small" />
              <span className="capitalize">remote</span>
            </div>
            <div className="flex gap-1 items-center text-foreground text-sm">
              <Person className="text-foreground" fontSize="small" />
              <span className="capitalize">not specified</span>
            </div>
          </div>
          <div className="flex gap-1 justify-between">
            <div className="flex gap-1 items-center text-foreground text-sm">
              <Timer className="text-foreground" fontSize="small" />
              <span className="capitalize">full time</span>
            </div>
            <div className="flex gap-1 items-center text-foreground text-sm">
              <Flag className="text-foreground" fontSize="small" />
              <span className="capitalize">
                {props.item.location !== "" ? props.item.location : "-----"}
              </span>
            </div>
          </div>

          <div className="flex gap-1 justify-between">
            <div className="flex gap-1 items-center text-foreground text-sm">
              <Laptop className="text-foreground" fontSize="small" />
              <span className="capitalize">{props.item.category.name}</span>
            </div>
            <div className="flex gap-1 items-center text-foreground text-sm">
              <Code className="text-foreground" fontSize="small" />
              <span className="capitalize">{props.item.subCategory.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardComponent;
