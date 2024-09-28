import * as React from "react";
import { render, RenderResult, within } from "@testing-library/react-native";
import {
  AlbumSummary,
  AlbumSummaryPropsType,
  getDisplayDate,
  getDisplayTime,
} from "../AlbumSummary";
import { translations } from "@data";

enum TEST_IDS {
  ALBUM_SUMMARY = "album-summary",
  RELEASE_DATE_TEXT = "release-date-text",
  TOTAL_TRACKS_TEXT = "total-tracks-text",
  TOTAL_DURATION_TEXT = "total-duration-text",
}

describe("AlbumSummary", () => {
  let container: RenderResult;
  const defaultProps: AlbumSummaryPropsType = {
    releaseDate: "2022-08-12",
    totalTracks: 28,
    totalDuration: 96,
  };

  beforeEach(() => {
    container = render(<AlbumSummary {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    expect(container.getByTestId(TEST_IDS.ALBUM_SUMMARY)).toBeTruthy();
  });

  describe("UI", () => {
    it("displays properly formatted release date text", () => {
      const releaseDateText = container.getByTestId(TEST_IDS.RELEASE_DATE_TEXT);
      const expectedResult = getDisplayDate(defaultProps.releaseDate);

      expect(within(releaseDateText).getByText(expectedResult)).toBeTruthy();
    });

    it("displays properly formatted total tracks text", () => {
      const totalTracksText = container.getByTestId(TEST_IDS.TOTAL_TRACKS_TEXT);
      const expectedResult = `${defaultProps.totalTracks} ${translations.album.copyrights.tracks}`;

      expect(within(totalTracksText).getByText(expectedResult)).toBeTruthy();
    });

    it("displays properly formatted total duration text", () => {
      const totalDurationText = container.getByTestId(
        TEST_IDS.TOTAL_DURATION_TEXT
      );
      const expectedResult = getDisplayTime(defaultProps.totalDuration);

      expect(within(totalDurationText).getByText(expectedResult)).toBeTruthy();
    });
  });
});