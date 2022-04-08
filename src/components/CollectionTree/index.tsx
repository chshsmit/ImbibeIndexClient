//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { ActionIcon, List, Transition } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "tabler-icons-react";
import { CollectionEntryItem } from "types";
import { RecipeContext } from "utils/context/RecipeContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface CollectionTreeProps {
  root: CollectionEntryItem;
  includeRecipes?: boolean;
  isTopLevel?: boolean;
  styles?: React.CSSProperties;
}

type BooleanMap = { [key: string]: boolean };

// const scaleY = {
//   in: { opacity: 1, transform: "scaleY(1)" },
//   out: { opacity: 0, transform: "scaleY(0)" },
//   common: { transformOrigin: "top" },
//   transitionProperty: "transform, opacity",
// };

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const CollectionTree = ({
  root,
  includeRecipes,
  isTopLevel,
  styles,
}: CollectionTreeProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------
  const { collections } = useContext(RecipeContext);

  const [sectionVisibilities, setSectionVisibilities] = useState<BooleanMap>(
    {}
  );

  useEffect(() => {
    const sections: BooleanMap = {};
    root.subCollections.forEach((subCollection) => {
      if (sections[subCollection] === undefined)
        sections[subCollection] = false;
    });

    setSectionVisibilities(sections);
  }, [root.subCollections]);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const changeSectionVisibility = (section: string) => {
    const curr = sectionVisibilities[section];

    setSectionVisibilities({
      ...sectionVisibilities,
      [section]: !curr,
    });
  };

  console.log({ root });

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <List withPadding style={{ ...styles }}>
      {isTopLevel && <List.Item>{root.name}</List.Item>}
      {root.subCollections.map((subCollection) => {
        const collection = collections.get(subCollection)!;

        return (
          <List.Item
            icon={(
              <ActionIcon
                onClick={() => changeSectionVisibility(subCollection)}
              >
                {sectionVisibilities[subCollection] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </ActionIcon>
            )}
            key={subCollection}
          >
            {collection.name}

            <Transition
              mounted={sectionVisibilities[subCollection]}
              transition="scale-y"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <CollectionTree
                  root={collections.get(subCollection)!}
                  styles={{ ...styles }}
                />
              )}
            </Transition>

            {/* {sectionVisibilities[subCollection] && (
              <CollectionTree root={collections.get(subCollection)!} />
            )} */}
          </List.Item>
        );
      })}
    </List>
  );
};

export default CollectionTree;
